import { Module } from '@nestjs/common';
import { DisheService } from '../../services/dishe/dishe.service';
import { OrmModule } from '../orm/orm.module';


@Module({
    imports:[OrmModule],
    providers: [DisheService],
    exports: [DisheService]
})
export class DisheModule { }
