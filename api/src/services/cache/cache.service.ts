import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';


@Global()
@Injectable()
export class CacheService implements OnModuleInit {
    private logger = new Logger(CacheService.name)
     client: Redis
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



}
