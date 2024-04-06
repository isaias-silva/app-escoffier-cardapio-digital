import { Module } from '@nestjs/common';
import { MenuService } from '../../services/menu/menu.service';
import { OrmModule } from '../orm/orm.module';

@Module({ 
    imports:[OrmModule],
    providers: [MenuService], 
    exports:[MenuService]
})
export class MenuModule { }
