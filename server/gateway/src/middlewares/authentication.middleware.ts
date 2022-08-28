import { CONFIG_ENV_USER_SECRET } from '../configs/env';
import {
    AccessTokenError,
    AuthFailureError,
    BadRequestError,
    NoDataError
} from '../core/api-error';
import asyncHandler from '../core/async-handler';
import JWT from '../core/jwt';
import { ProtectedRequest } from 'app-request';
import { UserModel } from '../modules/user/user.model';

const authentication = asyncHandler(async (req: ProtectedRequest, res, next) => {
    try {
        const access_token = req.headers.authorization;
        if (!access_token) {
            throw new AccessTokenError(
                req.t('errors.authentication.access_token_invalid')
            );
        }
        const decoded = await JWT.validate(access_token, CONFIG_ENV_USER_SECRET);

        const user = await UserModel.findById(decoded.id);
        if (!user) {
            throw new AuthFailureError(
                req.t('errors.authentication.user_not_register')
            );
        }

        req.access_token = access_token;
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        if (err instanceof AccessTokenError) throw err;
        if (err instanceof AuthFailureError) throw err;
        if (err instanceof NoDataError) throw err;
        throw new BadRequestError(req.t('errors.authentication.any_error'));
    }
});

export default authentication
