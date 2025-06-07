import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommonCategoryDto, CreateCategoryDto, DeleteCategoryDto, UpdateCategoryDto } from '../../dtos/category.dto';
import { ResponsesEnum } from '../../enums/responses.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../models/category.schema';
import { Model } from 'mongoose';


@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private model: Model<Category>) {

    }



    async createCategory(restaurantId: string, dto: CreateCategoryDto) {

        const { name } = dto
        const categoryInDb = await this.model.findOne({ name, restaurantId })

        if (categoryInDb) {
            throw new BadRequestException(ResponsesEnum.CATEGORY_ALREADY_EXISTS_IN_RESTAURANT)
        }

        await this.model.create({ restaurantId, ...dto })

        return { message: ResponsesEnum.CATEGORY_CREATED }
    }

    async getCategory(restaurantId: string, _id: string) {
        const categoryMenuRegisterInDb = await this.model.findOne({ restaurantId, _id });

        if (!categoryMenuRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.CATEGORY_NOT_FOUND)
        }
        return categoryMenuRegisterInDb
    }

    async getMyCategories(restaurantId: string) {

        return await this.model.find({ restaurantId })
    }

    async updateCategory(restaurantId: string, _id: string, dto: UpdateCategoryDto) {
        const categoryMenuRegisterInDb = await this.model.findOne({ _id, restaurantId })

        if (!categoryMenuRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.CATEGORY_NOT_FOUND)
        }
        const data = {
            name: dto.name != categoryMenuRegisterInDb.name ? dto.name : undefined,
            keywords: dto.keywords != categoryMenuRegisterInDb.keywords ? dto.keywords : undefined,

        }
        if (!data.keywords && !data.name) {
            throw new BadRequestException(ResponsesEnum.NOT_HAVE_CHANGES)
        }

        await this.model.updateOne({ _id }, data)

        return { message: ResponsesEnum.UPDATED_INFO }
    }

    async deleteCategory(restaurantId: string, dto: DeleteCategoryDto) {
        const { many, id } = dto
        if (many) {
            await this.model.deleteMany({ restaurantId })

        } else if (id) {
            const categoryMenuRegisterInDb = await this.model.findOne({ _id: id, restaurantId })

            if (!categoryMenuRegisterInDb) {
                throw new NotFoundException(ResponsesEnum.CATEGORY_NOT_FOUND)
            }
            await this.model.deleteOne({ _id: id, restaurantId })

        } else {
            throw new BadRequestException(ResponsesEnum.INVALID_BODY_OF_REQUEST)
        }


        return { message: ResponsesEnum.CATEGORY_DELETED }
    }
    async validCategories(restaurantId: string, _id: string) {
        let valid: boolean = true

        try {

            await this.getCategory(restaurantId, _id)
        }
        catch (err) {
            valid = false


        }
        return valid
    }


}
