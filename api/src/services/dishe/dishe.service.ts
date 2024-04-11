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

    ) {
    }
    private model = this.ormService.dishe

    async createDishe(restaurantId: string, dto: CreateDisheDto) {
        const { name, price, description, mode, categories, menuId } = dto


        const disheInDb = await this.model.findFirst({ where: { restaurantId, name } })

        if (disheInDb) {
            throw new BadRequestException(ResponsesEnum.DISHE_ALREADY_EXISTS)
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

    async getDishe(id: string, host: string) {
        const disheInDb = await this.model.findFirst({ where: { id } })
        if (!disheInDb) {
            throw new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND)
        }
        let image: string
        if (disheInDb.image) {

            image = await this.fileService.getImage(`${id}.png`, host)

            if (!image) {
                await this.fileService.writeImage(`${id}.png`, disheInDb.image)
                image = await this.fileService.getImage(`${id}.png`, host)
            }
        }

        const categoriesPromise = disheInDb.categories.map(async (category) => {
            try {
                const categoryDb = await this.categoryService.getCategory(disheInDb.restaurantId, category)
                return categoryDb.name

            } catch (err) {
                this.removeInvalidCategory(disheInDb.id, category, disheInDb.categories)
            }
        })
        const categories = await Promise.all(categoriesPromise)


        const { name, price, description, mode } = disheInDb

        return { name, price, description, mode, image, categories }

    }

    async getMenuDishes(menuId: string, count: number, page: number, host: string, mode: Mode) {


        const dishesDb = await this.model.findMany({
            where: { menuId, mode },
            take: count,
            skip: (page - 1) * count
        })
        const responseDishes = dishesDb.map(async (disheInDb) => {
            let image: string
            if (disheInDb.image) {

                image = await this.fileService.getImage(`${disheInDb.id}.png`, host)

                if (!image) {
                    await this.fileService.writeImage(`${disheInDb.id}.png`, disheInDb.image)
                    image = await this.fileService.getImage(`${disheInDb.id}.png`, host)
                }
            }
            const { name, price, description, mode } = disheInDb

            return { name, price, description, mode, image }
        })

        return await Promise.all(responseDishes)
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

    private async removeInvalidCategory(id: string, categoryInvalid: string, categories: string[]) {
        categories.splice(categories.indexOf(categoryInvalid), 1)

        await this.model.updateMany({
            where: { id }, data: {
                categories
            }
        })

    }
}
