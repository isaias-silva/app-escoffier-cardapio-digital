import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { DisheModule } from './modules/dishe/dishe.module';
import { MenuModule } from './modules/menu/menu.module';
import { CategoryModule } from './modules/category/category.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { ExtractURLMiddleware } from './middleware/extract.url.middleware';
import { ExtractDateAccessMiddleware } from './middleware/extract.date.access.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync(
      {
        useFactory: (config: ConfigService) => ({
          uri: config.get("DATABASE_URL")
        }),
        inject: [ConfigService]
      }
    ),
    RestaurantModule,
    DisheModule,
    MenuModule,
    CategoryModule,

    MulterModule.register({
      dest: '/upload',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'temp'),
      serveRoot: '/static',

    })

  ],

  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExtractURLMiddleware, ExtractDateAccessMiddleware).forRoutes('*')
  }
}
