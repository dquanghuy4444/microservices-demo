import { ENUM_ROLE_CODE } from "../../const/role";

export enum ENUM_GENDER {
    OTHER = 0,
    MALE = 1,
    FEMALE = 2,
}

export interface IVerifyEmailRequest {
    email: string;
}

export interface ICreateUserRequest extends IVerifyEmailRequest {
    username: string;
    phone_number: string;
    fullname: string;
    password: string;
    roles: ENUM_ROLE_CODE[]
}

