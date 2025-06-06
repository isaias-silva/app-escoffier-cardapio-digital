import { Module, forwardRef } from '@nestjs/common';
import { MenuService } from '../../services/menu/menu.service';
import { OrmModule } from '../orm/orm.module';
import { MenuController } from '../../controllers/menu/menu.controller';
import { DisheModule } from '../dishe/dishe.module';

@Module({
    imports: [OrmModule,forwardRef(()=>DisheModule)],
    providers: [MenuService],
    controllers: [MenuController],
    exports: [MenuService]
})
export class MenuModule { }
