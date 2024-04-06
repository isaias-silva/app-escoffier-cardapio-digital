import { Module } from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';

import { OrmModule } from '../orm/orm.module';

@Module({
    imports:[OrmModule],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule { }
