import { Module } from '@nestjs/common';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CacheModule } from '../cache/cache.module';

@Module({
    imports:[PrismaModule,CacheModule],
    providers: [RestaurantService],
    exports: [RestaurantService]
})
export class RestaurantModule { }
