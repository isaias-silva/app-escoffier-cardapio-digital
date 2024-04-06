import { Module } from '@nestjs/common';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CacheModule } from '../cache/cache.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports:[PrismaModule,CacheModule,MailModule],
    providers: [RestaurantService],
    exports: [RestaurantService]
})
export class RestaurantModule { }
