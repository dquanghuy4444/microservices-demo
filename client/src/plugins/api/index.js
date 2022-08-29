import AuthApi from './auth-api';
import UserApi from './user-api';

export default function ({ $axios }, inject) {
    const authApi = new AuthApi($axios);
    inject('authApi', authApi);

    const userApi = new UserApi($axios);
    inject('userApi', userApi);
}

