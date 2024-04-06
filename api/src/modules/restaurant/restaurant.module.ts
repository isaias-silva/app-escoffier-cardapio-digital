import { Module } from '@nestjs/common';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports:[PrismaModule],
    providers: [RestaurantService],
    exports: [RestaurantService]
})
export class RestaurantModule { }
