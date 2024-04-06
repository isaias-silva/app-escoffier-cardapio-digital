import { Module } from '@nestjs/common';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

import { CacheModule } from '../cache/cache.module';
import { MailModule } from '../mail/mail.module';
import { OrmModule } from '../orm/orm.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[OrmModule,CacheModule,MailModule, 
        JwtModule.register({
        global: true,
        secret: process.env.SECRET,

    })],
    providers: [RestaurantService],
    exports: [RestaurantService]
})
export class RestaurantModule { }
