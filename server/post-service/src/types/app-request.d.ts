import { Request } from 'express';
// import User from '../models/user';
// import Admin from '../models/admin';
// import { RoleCode } from '../const/role';
// import { EnumAction } from 'app/models/permission';

declare interface PublicRequest extends Request {
    apiKey: string;
    t: (__key: string, ...args?: any) => string
}

declare interface RoleRequest extends PublicRequest {
    // required_role: RoleCode[];
}

declare interface ProtectedRequest extends RoleRequest {
    // user: User;
    // permission: { [k: number]: EnumAction[] }
    // admin?: Admin;
    access_token: string;
}

declare interface InternalRequest extends ProtectedRequest {
    apiKey: string;
}

declare interface Tokens {
    accessToken: string;
    refreshToken: string;
}
