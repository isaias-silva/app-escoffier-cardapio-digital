import { Module } from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports:[PrismaModule],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule { }
