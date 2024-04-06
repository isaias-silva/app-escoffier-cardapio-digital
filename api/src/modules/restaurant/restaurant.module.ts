import { Module } from '@nestjs/common';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

import { CacheModule } from '../cache/cache.module';
import { MailModule } from '../mail/mail.module';
import { OrmModule } from '../orm/orm.module';

@Module({
    imports:[OrmModule,CacheModule,MailModule],
    providers: [RestaurantService],
    exports: [RestaurantService]
})
export class RestaurantModule { }
