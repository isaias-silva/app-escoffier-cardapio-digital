import { Module } from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';

import { OrmModule } from '../orm/orm.module';
import { CategoryController } from '../../controllers/category/category.controller';

@Module({
    imports:[OrmModule],
    providers: [CategoryService],
    exports: [CategoryService],
    controllers:[CategoryController]
})
export class CategoryModule { }
