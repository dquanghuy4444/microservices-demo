import { ENUM_STATUS_CODE, RedirectResponse, SuccessResponse } from '../../core/api-response';
import { ICreateUserRequest } from './user.type';
import { BadRequestError } from "../../core/api-error";
import User, { UserModel } from './user.model';
import { pick } from 'lodash';
import { PublicRequest } from 'app-request';
import crypto from 'crypto';
import JobQueueService from '../../services/job-queue';
import { TemplateModel } from '../template/template.model';
import { ENUM_TEMPLATE_CODE } from '../template/template.type';
import { CONFIG_ENV_WEBAPP_URL, CONFIG_ENV_REDIS_EXPIRE_TIME, CONFIG_ENV_USER_SECRET, CONFIG_ENV_BASE_URL } from '../../configs/env';
import { Response } from 'express';
import AuthController from '../auth/auth.controller';

const CacheService = require('../../services/redis/cache-service');

export default class UserController {
    private static createTokenForEmail(email: string) {
        return crypto.createHash('sha256').update(email).digest('hex');
    }


    private static async createVerifyUrl(
        userId: number,
        email: string,
        name: string
    ) {
        const token = UserController.createTokenForEmail(email ? email : '');
        const cache_user = await CacheService.get(token);
        if (!cache_user) {
            const objCache = {
                id: userId,
                need_email_verification: true
            };
            await CacheService.set(token, objCache, CONFIG_ENV_REDIS_EXPIRE_TIME);

            const template = await TemplateModel.findOne({
                code: ENUM_TEMPLATE_CODE.VERIFY_EMAIL_FOR_TEACHER
            });

            if (template) {
                const url = `${CONFIG_ENV_BASE_URL}/users/verify-email?token=${token}`;
                console.log(url);
                // await JobQueueService.sendMailWithTemplate({
                //     to: email,
                //     subject: template.title,
                //     body: template.content,
                //     data: { name, url }
                // });
            }

        }
        return { message: 'Verify URL created' };
    }

    public static async handleVerify(req: PublicRequest, res: Response) {
        return new SuccessResponse(
            pick(req.user, [
                'id',
                'roles',
                'first_name',
                'last_name',
                'avatar',
                'email'
            ])
        ).send(res);

    }

    public static async handleVerifyEmail(req: PublicRequest, res: Response) {
        const { token } = req.query;
        let verifyResult = ENUM_STATUS_CODE.SUCCESS;
        const accessToken = "";

        const cacheUser = await CacheService.get(token);

        if (!cacheUser || !cacheUser.need_email_verification) {
            verifyResult = ENUM_STATUS_CODE.FAILURE;
        } else {
            const user = await UserModel.findById(cacheUser.id)

            if (user && !user.is_verified_email) {
                await user.update({ is_verified_email: true })

                // const avatar = user.avatar || '';
                // accessToken = await AuthController.createToken(
                //     user.id,
                //     user.fullname,
                //     user.email,
                //     avatar,
                //     CONFIG_ENV_USER_SECRET
                // );
            } else {
                verifyResult = ENUM_STATUS_CODE.FAILURE;
            }
        }

        const verifyPage = `${CONFIG_ENV_WEBAPP_URL}/verify-email?status=${verifyResult}`;
        // if (accessToken) {
        //     verifyPage = `${verifyPage}&access_token=${accessToken}`;
        // }

        return new RedirectResponse(verifyPage).redirect(res);
    }

    public static async handleSendMailtoVerifyMail(req: PublicRequest, res: Response) {
        const reqBody: ICreateUserRequest = req.body;

        const { email } = reqBody

        const token = UserController.createTokenForEmail(email);

        const resendToken = token + '-resending-verify';

        const cacheResending = await CacheService.get(resendToken);
        if (cacheResending && cacheResending.resending_verify) {
            throw new BadRequestError(req.t('errors.user.verification_sent'));
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new BadRequestError(req.t('errors.user.not_found'));
        }

        if (user.is_verified_email) {
            throw new BadRequestError(req.t('errors.user.verified'));
        }

        await CacheService.set(resendToken, { resending_verify: true }, 5 * 60);

        const cacheUser = await CacheService.get(token);

        if (cacheUser) {
            const template = await TemplateModel.findOne({
                code: ENUM_TEMPLATE_CODE.VERIFY_EMAIL_FOR_TEACHER
            });
            if (template) {
                const url = `${CONFIG_ENV_WEBAPP_URL}/users/verify-email?token=${token}`;

                // await JobQueueService.sendMailWithTemplate({
                //     to: email,
                //     subject: template.title,
                //     body: template.content,
                //     data: {
                //         name: user.first_name,
                //         url
                //     }
                // });
            }
        } else {
            await UserController.createVerifyUrl(
                user.id,
                user.email,
                user.first_name
            );
        }

        return new SuccessResponse({
            message: 'Verification Email Resent'
        }).send(res);
    }

    public static async create(req: PublicRequest): Promise<User> {
        const reqBody: ICreateUserRequest = req.body;
        const { username, email, phone_number } = reqBody

        const userHasSameUsername = await UserModel.findOne({ username });
        if (userHasSameUsername) {
            throw new BadRequestError(req.t('errors.user.username_exists'));
        }

        const userHasSameInfo = await UserModel.findOne({
            $or: [
                { email }, { phone_number }
            ]
        });
        if (userHasSameInfo) {
            throw new BadRequestError(req.t('errors.user.info_exists'));
        }

        const user = await UserModel.create(reqBody);

        const result = pick(user, [
            'id',
            'role',
            'email',
            'fullname',
            'login_counter',
            'is_verified_email'
        ]);

        return result;
    }
}
