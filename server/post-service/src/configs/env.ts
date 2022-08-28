import 'dotenv/config';

const CONFIG_ENV_PORT = process.env.PORT || 8080;
const CONFIG_ENV_MONGODB_URI = process.env.MONGODB_URI || "";
const CONFIG_ENV_NODE_ENV = process.env.NODE_ENV || "develop";
const CONFIG_ENV_SALT = +(process.env.SALT || 12);
const CONFIG_ENC_USER_SECRET = process.env.USER_SECRET || "";
const CONFIG_ENC_ADMIN_SECRET = process.env.ADMIN_SECRET || "";

export {
    CONFIG_ENV_PORT,
    CONFIG_ENV_MONGODB_URI,
    CONFIG_ENV_NODE_ENV,
    CONFIG_ENV_SALT,
    CONFIG_ENC_USER_SECRET,
    CONFIG_ENC_ADMIN_SECRET,
}
