import { PublicRequest } from 'app-request';
import { BadRequestError } from "../core/api-error";
import User, { UserModel } from '../models/user.model';
import { pick } from 'lodash';

export default class UserController {
    public static async create(req: PublicRequest): Promise<User> {
        const { body, body: { email } } = req;

        const userHasSameUsername = await UserModel.findOne({ username: email });
        if (userHasSameUsername) {
            throw new BadRequestError("aaa");
        }

        const info: User = {
            username: email,
            ...body
        }

        const user = await UserModel.create(info);

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
