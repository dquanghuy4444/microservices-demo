
import { ENUM_EMAIL_TEMPLATE } from '../../const/email';
import { ENUM_BACKEND_EVENT, ENUM_BACKEND_NOTIFICATION } from '../../const/notification';

export const ENUM_TEMPLATE_CODE = {
    ...ENUM_EMAIL_TEMPLATE,
    ...ENUM_BACKEND_NOTIFICATION,
    ...ENUM_BACKEND_EVENT
};

export enum ENUM_TEMPLATE_TYPE {
    EMAIL = 1,
    NOTIFICATION = 2,
    EVENT = 3,
    PDF = 4
}
