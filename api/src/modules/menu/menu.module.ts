import { Module } from '@nestjs/common';
import { MenuService } from '../../services/menu/menu.service';
import { OrmModule } from '../orm/orm.module';
import { MenuController } from '../../controllers/menu/menu.controller';

@Module({
    imports: [OrmModule],
    providers: [MenuService],
    controllers: [MenuController],
    exports: [MenuService]
})
export class MenuModule { }
