import { Module } from '@nestjs/common';
import { DisheService } from '../../services/dishe/dishe.service';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
    imports:[PrismaModule],
    providers: [DisheService],
    exports: [DisheService]
})
export class DisheModule { }
