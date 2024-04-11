import { Module } from '@nestjs/common';
import { DisheService } from '../../services/dishe/dishe.service';
import { OrmModule } from '../orm/orm.module';
import { DisheController } from '../../controllers/dishe/dishe.controller';
import { FileModule } from '../file/file.module';
import { CategoryModule } from '../category/category.module';



@Module({
    imports: [OrmModule,
        FileModule,
        CategoryModule,
     
    ],
    providers: [DisheService],
    exports: [DisheService],
    controllers: [DisheController]
})
export class DisheModule { }
