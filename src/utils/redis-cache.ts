
import redis, { createClient } from 'redis';
import { logger } from './logger';

interface Cache {
    set(key: string, value: string, timeoutSeconds?: number): void;
    get(key: string): Promise<string | null>;
    delete(key: string): void;
    // del(key: string): void;
}

export class RedisDb {
    static isInstance: any;
    redisHost = process.env.REDIS_HOST || 'localhost';
    redisPort = process.env.REDIS_PORT || 6379;
    url = `redis://${this.redisHost}:${this.redisPort}`

    static connection() {
        if (RedisDb.isInstance) {
            return RedisDb.isInstance
        }
        createClient({ url: 'redis://127.0.0.1:6379' }).connect().then(redisClient => {
            RedisDb.isInstance = redisClient
            return redisClient
        }).catch(err => logger.error(`Error connecting to Redis ${err}`))
    }
    // Set a key-value pair in the cache with an optional timeout in seconds
    static set(key: string, value: string, timeoutSeconds?: number) {
        RedisDb.isInstance.set(key, value);
    }

    // Get the value associated with a key from the cache
    static get(key: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            RedisDb.isInstance.get(key);
        });
    }

    // Delete the value associated with a key from the cache
    static delete(key: string) {
        RedisDb.isInstance.del(key);
    }

}
const redisFunc = async () => {
    // Redis configuration
    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort = process.env.REDIS_PORT || 6379;
    const url = `redis://${redisHost}:${redisPort}`
    // Create Redis client and connect to Redis server
    const redisClient = createClient();
    await redisClient.connect()
    redisClient.on('error', (error: Error) => {
        logger.error(`Error connecting to Redis: ${error}`);
    });



    // Initialize Redis cache object
    const cache: Cache = {
        // Set a key-value pair in the cache with an optional timeout in seconds
        set: (key: string, value: string, timeoutSeconds?: number) => {
            redisClient.set(key, value);
        },

        // Get the value associated with a key from the cache
        get: async (key: string): Promise<string | null> => {
            return new Promise((resolve, reject) => {
                redisClient.get(key);
            });
        },

        // Delete the value associated with a key from the cache
        delete: (key: string) => {
            redisClient.del(key);
        },

    };
    return cache
}

export { redisFunc as cache };

