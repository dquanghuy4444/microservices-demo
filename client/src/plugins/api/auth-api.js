export default class AuthApi {
    constructor(axios) {
        this.axios = axios;
        this.baseUrl = process.env.baseUrl ? `${process.env.baseUrl}/gateway/auth` : '';
    }

    async login(data) {
        return await this.axios.post(`${this.baseUrl}/login`, data);
    }

    async register(data) {
        return await this.axios.post(`${this.baseUrl}/student/register`, data);
    }

    async forgetPassword(data) {
        return await this.axios.post(`${this.baseUrl}/forget-password`, data);
    }

    async resetPassword(data) {
        return await this.axios.post(`${this.baseUrl}/reset-password`, data);
    }

    async verifyEmail(data) {
        return await this.axios.post(`${this.baseUrl}/verify-email` , data);
    }
}
