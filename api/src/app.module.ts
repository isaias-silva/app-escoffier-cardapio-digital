import { Module } from '@nestjs/common';

import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { DisheModule } from './modules/dishe/dishe.module';
import { MenuModule } from './modules/menu/menu.module';
import { CategoryModule } from './modules/category/category.module';
import { MailModule } from './modules/mail/mail.module';
import { MailService } from './services/mail/mail.service';




@Module({
  imports: [
    RestaurantModule,
    DisheModule,
    MenuModule,
    CategoryModule],
    
  controllers: [],
  providers: [],
})
export class AppModule { }
