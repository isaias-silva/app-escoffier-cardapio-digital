import { Module, forwardRef } from '@nestjs/common';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

import { CacheModule } from '../cache/cache.module';
import { MailModule } from '../mail/mail.module';
import { OrmModule } from '../orm/orm.module';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from '../file/file.module';
import { RestaurantController } from '../../controllers/restaurant/restaurant.controller';
import { MenuModule } from '../menu/menu.module';
import { CategoryModule } from '../category/category.module';
import { DisheModule } from '../dishe/dishe.module';

@Module({
    imports: [OrmModule,
        CacheModule,
        MailModule,
        FileModule,
        MenuModule,
        CategoryModule,
        forwardRef(()=>DisheModule),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET,

        })],
    providers: [RestaurantService],
    exports: [RestaurantService],
    controllers:[RestaurantController]
})
export class RestaurantModule { }
