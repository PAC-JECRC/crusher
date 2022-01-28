import IORedis = require("ioredis");
import { RedisManager as ParentRedisManager } from "@shared/modules/redis";

// @TODO: This should come from where the class is initalized.
function getConnectionObject(): IORedis.RedisOptions {
	if (process.env.REDIS_CONNECTION_STRING) {
		return { path: process.env.REDIS_CONNECTION_STRING, enableReadyCheck: false, maxRetriesPerRequest: null };
	}

	let connectionObject: IORedis.RedisOptions = {
		username: process.env.REDIS_USER ? process.env.REDIS_USER : undefined,
		password: process.env.REDIS_PASSWORD,
	};
	const server = {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : null,
	};

	if (process.env.REDIS_SECURE) connectionObject.tls = server;
	else connectionObject = { ...connectionObject, ...server };

	return { ...connectionObject, enableReadyCheck: false, maxRetriesPerRequest: null };
}
class RedisManager extends ParentRedisManager {
	constructor() {
		super(getConnectionObject());
	}
}

export { RedisManager };
