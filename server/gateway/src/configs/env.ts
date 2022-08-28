import 'dotenv/config';

export const CONFIG_ENV_PORT = process.env.PORT || 8080;
export const CONFIG_ENV_MONGODB_URI = process.env.MONGODB_URI || "";
export const CONFIG_ENV_NODE_ENV = process.env.NODE_ENV || "develop";
export const CONFIG_ENV_SALT = +(process.env.SALT || 12);
export const CONFIG_ENV_USER_SECRET = process.env.USER_SECRET || "";
export const CONFIG_ENV_ADMIN_SECRET = process.env.ADMIN_SECRET || "";

export const CONFIG_ENV_JOB_QUEUE_URL = process.env.JOB_QUEUE_URL || "";

export const CONFIG_ENV_WEBAPP_URL = process.env.WEBAPP_URL || "";
export const CONFIG_ENV_BASE_URL = process.env.BASE_URL || "";

export const CONFIG_ENV_REDIS_HOST = process.env.REDIS_HOST || "";
export const CONFIG_ENV_REDIS_PORT = process.env.REDIS_PORT || "";
export const CONFIG_ENV_REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
export const CONFIG_ENV_REDIS_EXPIRE_TIME = +(process.env.REDIS_EXPIRE_TIME || 1800)
