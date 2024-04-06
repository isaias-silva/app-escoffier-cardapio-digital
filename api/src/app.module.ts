import { Module } from '@nestjs/common';

import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { DisheModule } from './modules/dishe/dishe.module';
import { MenuModule } from './modules/menu/menu.module';
import { CategoryModule } from './modules/category/category.module';



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
