import { Module } from '@nestjs/common';

import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { DisheModule } from './modules/dishe/dishe.module';
import { MenuModule } from './modules/menu/menu.module';
import { CategoryModule } from './modules/category/category.module';
import { PrismaService } from './services/prisma/prisma.service';



@Module({
  imports: [
    RestaurantModule,
    DisheModule,
    MenuModule,
    CategoryModule],
    
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
