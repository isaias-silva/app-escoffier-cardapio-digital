import { forwardRef, Module } from '@nestjs/common';
import { MenuService } from '../../services/menu/menu.service';
import { MenuController } from '../../controllers/menu/menu.controller';
import { Menu, MenuSchema } from '../../models/menu.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DisheModule } from '../dishe/dishe.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    forwardRef(() => DisheModule)],
    providers: [MenuService],
    controllers: [MenuController],
    exports: [MenuService]
})
export class MenuModule { }
