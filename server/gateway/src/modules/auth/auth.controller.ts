import { ENUM_TEMPLATE_CODE } from '../template/template.type';
import { TemplateModel } from '../template/template.model';
import { ProtectedRequest } from 'app-request';
import { SuccessResponse } from "../../core/api-response";
import { BadRequestError, InternalError, EmailNotVerifyError } from "../../core/api-error";
import { Response, NextFunction } from 'express';
import User, { UserModel } from '../user/user.model'
import UserController from '../user/user.controller';
import { ENUM_ROLE_CODE } from '../../const/role';
import JWT, { JwtPayload } from '../../core/jwt';
import { CONFIG_ENV_WEBAPP_URL, CONFIG_ENV_USER_SECRET } from '../../configs/env';
import { pick } from 'lodash';
import StudentController from '../student/student.controller';
import crypto from 'crypto';
import JobQueueService from '../../services/job-queue';

const CacheService = require('../../services/redis/cache-service');

const SECONDS_IN_ONE_MINUTE = 60

export default class AuthController {
    public static async createToken(
        id: number,
        fullname: string,
        email: string,
        avatar: string,
        secret: string
    ) {
        const access_token = await JWT.encode(
            new JwtPayload(
                id,
                fullname,
                email,
                avatar
            ),
            secret
        );
        return access_token;
    }

    private static createTokenForEmailForgetPassword(email: string) {
        return crypto.createHash('sha512').update(email).digest('hex');
    }

    public static async handleVerifyToken(req: ProtectedRequest, res: Response) {
        const user = req.user;
        return new SuccessResponse(user).send(res);
    }

    public static async handleLogin(req: ProtectedRequest, res: Response, next: NextFunction) {
        try {

            const { username, password } = req.body;

            const user = await UserModel.findOne({ username })
            if (!user) {
                throw new BadRequestError(
                    req.t('errors.authentication.login_failure')
                );
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new BadRequestError(
                    req.t('errors.authentication.login_failure')
                );
            }

            if (!user.email || !user.is_verified_email) {
                throw new EmailNotVerifyError(
                    req.t('errors.user.email_not_verified')
                );
            }

            if (!user.is_active && !user.last_login) {
                throw new BadRequestError(req.t('errors.user.inactive'));
            }

            const access_token = await AuthController.createToken(
                user.id,
                user.fullname,
                user.email,
                user.avatar,
                CONFIG_ENV_USER_SECRET
            );

            res.cookie('token', access_token);

            return new SuccessResponse({
                user: pick(user, [
                    'id',
                    'avatar',
                    'roles',
                    'first_name',
                    'last_name',
                    'email'
                ]),
                access_token
            }).send(res);
        } catch (error: any) {
            next(error)
        }
    }

    public static async handleRegisterForStudent(req: ProtectedRequest, res: Response, next: NextFunction) {
        try {

            req.body['roles'] = [ENUM_ROLE_CODE.STUDENT];

            const user = await UserController.create(req)

            await StudentController.create(req, {
                userId: user.id
            })

            return new SuccessResponse<User>(user).send(res)
        } catch (error: any) {
            next(new InternalError(error?.message))
        }
    }

    public static async handleRegisterForTeacher(req: ProtectedRequest, res: Response, next: NextFunction) {
        try {
            req.body['roles'] = [ENUM_ROLE_CODE.TEACHER];

            const user = await UserController.create(req)

            return new SuccessResponse<User>(user).send(res)
        } catch (error: any) {
            next(new InternalError(error?.message))
        }
    }


    public static async handleForgetPassword(req: ProtectedRequest, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            const token = AuthController.createTokenForEmailForgetPassword(email);

            const resendToken = token + '-resending-reset-pass';
            const cacheResending = await CacheService.get(resendToken);
            if (cacheResending && cacheResending.resending_reset) {
                throw new BadRequestError(req.t('errors.user.reset_pass_sent'));
            }

            const user = await UserModel.findOne({ email });

            if (!user) {
                return new SuccessResponse({
                    message: 'Reset Email sent'
                }).send(res);
            }

            if (!user.is_active) {
                throw new BadRequestError(req.t('errors.user.inactive'));
            }

            await CacheService.set(resendToken, { resending_reset: true }, 5 * SECONDS_IN_ONE_MINUTE);

            const objCache = {
                id: user.id,
                need_reset_password: true
            };
            await CacheService.set(token, objCache, 15 * SECONDS_IN_ONE_MINUTE);

            const template = await TemplateModel.findOne({
                code: ENUM_TEMPLATE_CODE.FORGET_PASSWORD
            });

            if (!template) {
                throw new BadRequestError(req.t('errors.email.template_not_found'));
            }

            const url = `${CONFIG_ENV_WEBAPP_URL}/reset-password?token=${token}`;

            console.log(url);
            // await JobQueueService.sendMailWithTemplate({
            //     to: email,
            //     subject: template.title,
            //     body: template.content,
            //     data: {
            //         name: user.first_name,
            //         url: url
            //     }
            // });

            return new SuccessResponse({
                message: "ok"
            }).send(res);

        } catch (error: any) {
            next(error)
        }
    }

    public static async handleResetPassword(req: ProtectedRequest, res: Response, next: NextFunction) {
        try {
            const { new_password } = req.body;
            const token = req.headers.authorization;

            const cacheUser = await CacheService.get(token);
            console.log(token);
            if (!cacheUser && !cacheUser.need_reset_password) {
                throw new BadRequestError(req.t('errors.user.cant_reset_pass'));
            }

            const user = await UserModel.findById(cacheUser.id);
            if (!user)
                throw new BadRequestError(req.t('errors.user.cant_reset_pass'));

            user.password = new_password;
            user.is_password_null = false;
            await user.save();

            return new SuccessResponse({
                message: 'Password updated'
            }).send(res);
        } catch (error: any) {
            next(error)
        }
    }
}
