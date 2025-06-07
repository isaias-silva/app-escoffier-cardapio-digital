import { Module } from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';

import { CategoryController } from '../../controllers/category/category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../../models/category.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
    providers: [CategoryService],
    exports: [CategoryService],
    controllers: [CategoryController]
})
export class CategoryModule { }
