import { sign, verify } from 'jsonwebtoken';
import { promisify } from 'util';

export default class JWT {
    public static async encode(
        payload: JwtPayload,
        secret: string
    ): Promise<string> {
        // @ts-ignore
        return promisify(sign)({ ...payload }, secret, { algorithm: 'HS256' });
    }

    public static async decode(
        token: string,
        secret: string
    ): Promise<JwtPayload> {
        // @ts-ignore
        return (await promisify(verify)(token, secret, {
            ignoreExpiration: false
        })) as JwtPayload;
    }

    public static async validate(token: string, secret: string) {
        // @ts-ignore
        return (await promisify(verify)(token, secret)) as JwtPayload;
    }
}

export class JwtPayload {
    id: number;
    fullname: string;
    email: string;
    avatar: string;
    iat: number;
    exp: number;

    constructor(
        id: number,
        fullname: string,
        email: string,
        avatar: string,
        validity = 10
    ) {

        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.avatar = avatar;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity * 30 * 24 * 60 * 60;
    }
}
