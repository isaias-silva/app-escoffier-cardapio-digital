import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FileService } from '../file/file.service';
import { CreateDisheDto, DeleteDisheDto, UpdateDisheDto } from '../../dtos/dishe.dto';
import { ResponsesEnum } from '../../enums/responses.enum';
import { CategoryService } from '../category/category.service';
import { Mode } from '../../enums/mode.dishe.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Dishe } from '../../models/dishe.schema';
import { Model } from 'mongoose';
import { ICategory } from '../../interfaces/category.interface';
import { Category } from '../../models/category.schema';


@Injectable()
export class DisheService {
    constructor(
        @InjectModel(Dishe.name) private readonly model: Model<Dishe>,
        private fileService: FileService,
        private categoryService: CategoryService,

    ) {
    }


    async createDishe(restaurantId: string, dto: CreateDisheDto) {
        const { name, price, description, mode, categoryId, menuId } = dto


        const disheInDb = await this.model.findOne({ restaurantId, name })

        if (disheInDb) {
            throw new BadRequestException(ResponsesEnum.DISHE_ALREADY_EXISTS)
        }


        let validCategories: boolean = await this.categoryService.validCategories(restaurantId, categoryId)

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
            categoryId

        }
        const dishe = await this.model.create({ restaurantId, ...data, menuId })

        return { message: ResponsesEnum.DISHE_CREATED, id: dishe.id }
    }

    async getDishe(_id: string, host: string) {
        const disheInDb = await this.model.findOne({ _id })
        if (!disheInDb) {
            throw new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND)
        }
        let image: string
        if (disheInDb.image) {

            image = await this.fileService.getImage(disheInDb.image, host)


        }
        let category: Category
        try {

            category = await this.categoryService.getCategory(disheInDb.restaurantId, disheInDb.categoryId)

        } catch (err) {
            this.removeInvalidCategory(disheInDb.id, disheInDb.categoryId)
        }


        const { name, price, description, mode, restaurantId, menuId } = disheInDb

        return { restaurantId, menuId, name, price, description, mode, image, category: category ? { id: category["id"], name: category.name, keywords: category.keywords } : 'N/A' }

    }

    async getMenuDishes(menuId: string,
        count: number,
        page: number,
        host: string,
        mode?: Mode,
        categoryId?: string
    ) {


        const dishesDb = await this.model.find({ menuId, mode, categoryId })

        const responseDishes = dishesDb.map(async (disheInDb) => {
            let image: string
            if (disheInDb.image) {

                image = await this.fileService.getImage(disheInDb.image, host)

            }
            const { name, price, description, mode, categoryId, id } = disheInDb
            let category: Category
            try {
                category = await this.categoryService.getCategory(disheInDb.restaurantId, categoryId)
            } catch (err) {
                this.removeInvalidCategory(disheInDb.id, disheInDb.categoryId)
            }

            return { id, name, price, description, mode, image, category: category ? { name: category.name, keywords: category.keywords } : 'N/A' }
        })

        return await Promise.all(responseDishes)
    }

    async updateDishe(restaurantId: string, _id: string, dto: UpdateDisheDto) {

        const disheInDb = await this.model.findOne({ restaurantId, _id })
        if (!disheInDb) {
            throw new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND)
        }

        const { name, price, description, mode, categoryId } = dto

        let validCategories: boolean = await this.categoryService.validCategories(restaurantId, categoryId)

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
            categoryId

        }
        await this.model.updateOne({ _id: disheInDb.id }, data)
        return { message: ResponsesEnum.DISHE_UPDATED }
    }

    async updateDisheProfile(restaurantId: string, _id: string, data: Buffer) {
        const disheInDb = await this.model.findOne({ _id, restaurantId })
        if (!disheInDb) {
            throw new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND)
        }

        const filename = `dishe_${_id}.png`

        await this.model.updateOne({ _id }, { image: filename })

        this.fileService.writeImage(filename, data)

        return { message: ResponsesEnum.DISHE_IMAGE_UPLOADED }
    }

    async deleteDishe(restaurantId: string, dto: DeleteDisheDto) {
        const { many, id } = dto
        if (many) {
            await this.model.deleteMany({ where: { restaurantId } })

        } else if (id) {
            const categoryMenuRegisterInDb = await this.model.findOne({ _id: id, restaurantId })

            if (!categoryMenuRegisterInDb) {
                throw new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND)
            }
            await this.model.deleteOne({ _id: id, restaurantId })
        } else {
            throw new BadRequestException(ResponsesEnum.INVALID_BODY_OF_REQUEST)
        }

        return { message: ResponsesEnum.DISHE_DELETED }

    }

    private async removeInvalidCategory(_id: string, categoryInvalid: string) {

        await this.model.updateMany({ _id, categoryId: categoryInvalid },
            {
                categoryId: undefined
            })
    }
}
