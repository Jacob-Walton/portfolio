import Redis from "ioredis";
import fs from "node:fs";

class RedisClient {
    private static instance: Redis | null = null;

    private constructor() {}

    public static getInstance(): Redis {
        if (!RedisClient.instance) {
            const tlsOptions: {
                ca?: Buffer;
                cert?: Buffer;
                key?: Buffer;
                rejectUnauthorized: boolean;
            } = {
                rejectUnauthorized: false
            };

            if (process.env.REDIS_TLS_CA_PATH) {
                tlsOptions.ca = fs.readFileSync(process.env.REDIS_TLS_CA_PATH);
            }
            
            if (process.env.REDIS_TLS_CERT_PATH) {
                tlsOptions.cert = fs.readFileSync(process.env.REDIS_TLS_CERT_PATH);
            }
            
            if (process.env.REDIS_TLS_KEY_PATH) {
                tlsOptions.key = fs.readFileSync(process.env.REDIS_TLS_KEY_PATH);
            }

            const hasTlsOptions = tlsOptions.ca !== undefined || 
                                tlsOptions.cert !== undefined || 
                                tlsOptions.key !== undefined;

            const redisHost = process.env.REDIS_HOST || "127.0.0.1";
            const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;
            const redisPassword = process.env.REDIS_PASSWORD || undefined;
            const redisUsername = process.env.REDIS_USERNAME || undefined;

            const connectionOptions = {
                host: redisHost,
                port: redisPort,
                password: redisPassword,
                username: redisUsername,
                tls: hasTlsOptions ? tlsOptions : undefined
            };

            RedisClient.instance = new Redis(connectionOptions);

            RedisClient.instance.on('connect', () => {
            });

            RedisClient.instance.on('error', (err) => {
                console.error('Redis connection error:', err);
            });
        }
        return RedisClient.instance;
    }
}

const redisClient = RedisClient.getInstance();
export default redisClient;