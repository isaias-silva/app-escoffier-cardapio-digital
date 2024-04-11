import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrmService } from '../orm/orm.service';
import { FileService } from '../file/file.service';
import { CreateDisheDto, DeleteDisheDto, UpdateDisheDto } from '../../dtos/dishe.dto';
import { ResponsesEnum } from '../../enums/responses.enum';
import { CategoryService } from '../category/category.service';
import { Mode } from '../../enums/mode.dishe.enum';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class DisheService {
    constructor(private ormService: OrmService,
        private fileService: FileService,
        private categoryService: CategoryService,
        private menuService: MenuService
    ) {
    }
    private model = this.ormService.dishe

    async createDishe(restaurantId: string, dto: CreateDisheDto) {
        const { name, price, description, mode, categories, menuId } = dto

        
        const [disheInDb, menuInDb] = await Promise.all([this.model.findFirst({ where: { restaurantId, name } }), this.menuService.getMenu(menuId)])

        if (disheInDb) {
            throw new BadRequestException(ResponsesEnum.DISHE_ALREADY_EXISTS)
        }
        if(!menuInDb){
            throw new BadRequestException(ResponsesEnum.MENU_NOT_FOUND)

        }

        let validCategories: boolean = await this.categoryService.validCategories(restaurantId, categories)

        if (!validCategories) {
            throw new BadRequestException(ResponsesEnum.INVALID_CATEGORIES)
        }
        if (mode != Mode.MORNNING && mode != Mode.NIGHT) {
            throw new BadRequestException(ResponsesEnum.INVALID_DISHE_MODE)
        }

        const data = {
            name,
            price,
            description,
            mode,
            categories

        }
        await this.model.create({ data: { restaurantId, ...data, menuId } })

        return { message: ResponsesEnum.DISHE_CREATED }
    }

    async getDishe(id: string) {
        const disheInDb = await this.model.findFirst({ where: { id } })
        if (!disheInDb) {
            throw new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND)
        }
        return disheInDb

    }

    async getMenuDishes(menuId: string, count: number, page: number) {
        await this.menuService.getMenu(menuId)
       
        return await this.model.findMany({
            where: { menuId },
            take: count,
            skip: (page - 1) * count
        })
    }

    async updateDishe(restaurantId: string, id: string, dto: UpdateDisheDto) {

        const disheInDb = await this.model.findFirst({ where: { restaurantId, id } })
        if (!disheInDb) {
            throw new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND)
        }

        const { name, price, description, mode, categories } = dto

        let validCategories: boolean = await this.categoryService.validCategories(restaurantId, categories)

        if (!validCategories) {
            throw new BadRequestException(ResponsesEnum.INVALID_CATEGORIES)
        }
        if (mode != Mode.MORNNING && mode != Mode.NIGHT) {
            throw new BadRequestException(ResponsesEnum.INVALID_DISHE_MODE)
        }

        const data = {
            name,
            price,
            description,
            mode,
            categories

        }
        await this.model.update({ where: { id: disheInDb.id }, data })
        return { message: ResponsesEnum.DISHE_UPDATED }
    }

    async updateDisheProfile(restaurantId: string, id: string, data: Buffer) {
        const disheInDb = await this.model.findFirst({
            where: { id, restaurantId }
        })
        if (!disheInDb) {
            throw new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND)
        }

        await this.model.update({
            where: { id },
            data: {
                image: data
            }
        })
        this.fileService.writeImage(`${id}.png`, data)

        return { message: ResponsesEnum.DISHE_IMAGE_UPLOADED }
    }

    async deleteDishe(restaurantId: string, dto: DeleteDisheDto) {
        const { many, id } = dto
        if (many) {
            await this.model.deleteMany({ where: { restaurantId } })

        } else if (id) {
            const categoryMenuRegisterInDb = await this.model.findFirst({ where: { id, restaurantId } })

            if (!categoryMenuRegisterInDb) {
                throw new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND)
            }
        } else {
            throw new BadRequestException(ResponsesEnum.INVALID_BODY_OF_REQUEST)
        }
        await this.model.delete({ where: { id } })
        return { message: ResponsesEnum.DISHE_DELETED }

    }
}
