export default class UserApi {
    constructor(axios) {
        this.axios = axios;
        this.baseUrl = process.env.baseUrl ? `${process.env.baseUrl}/gateway/users` : '';
    }

    async verifyEmail(data) {
        return await this.axios.post(`${this.baseUrl}/verify-email` , data);
    }

    async verify() {
        return await this.axios.get(`${this.baseUrl}/me`);
    }
}
