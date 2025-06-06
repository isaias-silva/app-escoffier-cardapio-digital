import { Module } from '@nestjs/common';
import { OrmService } from '../../services/orm/orm.service';


@Module({
    providers:[OrmService],
    exports:[OrmService]
})
export class OrmModule {}
