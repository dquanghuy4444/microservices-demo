import { CONFIG_ENV_REDIS_HOST, CONFIG_ENV_REDIS_PORT, CONFIG_ENV_REDIS_PASSWORD } from "../../configs/env"

const createClientRedis = require('./redis');

const client = createClientRedis({
    host: CONFIG_ENV_REDIS_HOST,
    port: CONFIG_ENV_REDIS_PORT,
    password: CONFIG_ENV_REDIS_PASSWORD
});
console.log(client);

const ten_minute = 10 * 60;

exports.set = (key, objectCache, expired = ten_minute) => {
    console.log('set cache expired', expired);
    const object = JSON.stringify(objectCache);

    return client.setAsync(`${key}`, object, 'EX', expired).then((result) => {
        return Promise.resolve(objectCache);
    });
};

exports.get = (key) => {
    return client.getAsync(`${key}`).then((result) => {
        try {
            const object = JSON.parse(result);
            return Promise.resolve(object);
        } catch (error) {
            return Promise.resolve(result);
        }
    });
};

exports.delete = (key) => {
    console.log('xoa key', key);
    return client.delAsync(`${key}`).then((result) => {
        return Promise.resolve(key);
    });
};
