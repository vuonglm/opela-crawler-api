const REDIS_HOST = process.env.REDIS_PORT || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_DB = process.env.REDIS_DB || 1;
const REDIS_PWD = process.env.REDIS_PWD || 'redis@123';

const redisConfig = {
	host: REDIS_HOST,
	post: REDIS_PORT,
	db: REDIS_DB,
	password: REDIS_PWD
};

export { redisConfig };
