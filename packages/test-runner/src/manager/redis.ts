import { REDDIS } from "@config/database";
import IORedis, { Redis } from "ioredis";

export class RedisManager {
	static client: Redis;

	static initialize() {
		if (!RedisManager.client) {
			const connectionObject = REDDIS.connectionString
				? REDDIS.connectionString
				: { host: REDDIS.host, port: REDDIS.port || null, password: REDDIS.password };

			RedisManager.client = new IORedis(connectionObject as any);
			console.log(`Connected to ${this.client.options.host}, ${this.client.options.port}`);
		} else {
			console.error(`Already connected to redis...`);
		}
	}

	static get() {
		return RedisManager.client;
	}
}
