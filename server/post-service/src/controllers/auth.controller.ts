import { PublicRequest } from 'app-request';
import { SuccessResponse } from "../core/api-response";
import { BadRequestError, InternalError } from "../core/api-error";
import { Response, NextFunction } from 'express';
import User, { UserModel } from '../models/user.model';
import UserController from '../controllers/user.controller';
import { ENUM_ROLE_CODE } from '../const/role';
import JWT, { JwtPayload } from '../core/jwt';
import { CONFIG_ENC_USER_SECRET } from '../configs/env';
import { pick } from 'lodash';

export default class AuthController {
    private static async createToken(
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

    public static async login(req: PublicRequest, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ $or: [{ email }, { username: email }] })
            if (!user) {
                throw new BadRequestError("aaaa")
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new BadRequestError("aaaa")
            }
            const access_token = await AuthController.createToken(
                user.id,
                user.fullname,
                user.email,
                user.avatar,
                CONFIG_ENC_USER_SECRET
            );

            res.cookie('token', access_token);

            return new SuccessResponse({
                user: pick(user, [
                    'id',
                    'role',
                    'first_name',
                    'last_name',
                    'email'
                ]),
                access_token
            }).send(res);
        } catch (error: any) {
            next(new InternalError(error?.message))
        }
    }

    public static async registerForStudent(req: PublicRequest, res: Response, next: NextFunction) {
        try {
            req.body['role'] = [ENUM_ROLE_CODE.STUDENT];

            const user = await UserController.create(req)

            return new SuccessResponse<User>(user).send(res)
        } catch (error: any) {
            next(new InternalError(error?.message))
        }
    }

    public static async registerForTeacher(req: PublicRequest, res: Response, next: NextFunction) {
        try {
            req.body['role'] = [ENUM_ROLE_CODE.TEACHER];

            const user = await UserController.create(req)

            return new SuccessResponse<User>(user).send(res)
        } catch (error: any) {
            next(new InternalError(error?.message))
        }
    }
}
