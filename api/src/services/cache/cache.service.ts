import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';


@Global()
@Injectable()
export class CacheService implements OnModuleInit {
    private logger = new Logger(CacheService.name)
    private client: Redis
    async onModuleInit() {
        try {
            const port = parseInt(process.env.REDIS_PORT)
            const host = process.env.REDIS_HOST
            const password = process.env.REDIS_PASS

            if (!port || !host) {
                throw new Error("invalid credentials")
            }

            this.client = new Redis({
                host,
                port,
                password,
            })

            this.logger.verbose('redis connection successful')
        } catch (err) {
            this.logger.error(`error in redis connection: ${err}`)

        }
    }

    async setCache(key: string, value: any) {
        this.logger.debug('set cache data')
        this.client.set(key, JSON.stringify(value))
    }
    async getCache(key: string) {
        this.logger.debug('cache data')
        return await this.client.get(key)
    }
    async clearCache(key: string) {
        this.client.del(key);
    }

}
