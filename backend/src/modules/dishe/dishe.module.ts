import { Module } from '@nestjs/common';
import { DisheService } from '../../services/dishe/dishe.service';

import { DisheController } from '../../controllers/dishe/dishe.controller';
import { FileModule } from '../file/file.module';
import { CategoryModule } from '../category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Dishe, DisheSchema } from '../../models/dishe.schema';



@Module({
    imports: [
      MongooseModule.forFeature([{ name: Dishe.name, schema: DisheSchema }]),
        FileModule,
        CategoryModule,
     
    ],
    providers: [DisheService],
    exports: [DisheService],
    controllers: [DisheController]
})
export class DisheModule { }
