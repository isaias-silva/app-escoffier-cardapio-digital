import { Module } from '@nestjs/common';
import { DisheService } from '../../services/dishe/dishe.service';
import { OrmModule } from '../orm/orm.module';
import { DisheController } from '../../controllers/dishe/dishe.controller';
import { FileModule } from '../file/file.module';


@Module({
    imports:[OrmModule,FileModule],
    providers: [DisheService],
    exports: [DisheService],
    controllers:[DisheController]
})
export class DisheModule { }
