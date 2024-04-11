import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrmService } from '../orm/orm.service';
import { CommonCategoryDto, CreateCategoryDto, DeleteCategoryDto, UpdateCategoryDto } from '../../dtos/category.dto';
import { ResponsesEnum } from '../../enums/responses.enum';


@Injectable()
export class CategoryService {
    constructor(private ormService: OrmService) {

    }
    private model = this.ormService.category


    async createCategory(restaurantId: string, dto: CreateCategoryDto) {

        const { name } = dto
        const categoryInDb = await this.model.findFirst({ where: { name, restaurantId } })

        if (categoryInDb) {
            throw new BadRequestException(ResponsesEnum.CATEGORY_ALREADY_EXISTS_IN_RESTAURANT)
        }

        await this.model.create({ data: { restaurantId, ...dto } })

        return { message: ResponsesEnum.CATEGORY_CREATED }
    }

    async getCategory(restaurantId: string, id: string) {
        const categoryMenuRegisterInDb = await this.model.findFirst({ where: { restaurantId, id } })

        if (!categoryMenuRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.CATEGORY_NOT_FOUND)
        }
        return categoryMenuRegisterInDb
    }

    async getMyCategories(restaurantId: string) {

        return await this.model.findMany({ where: { restaurantId } })
    }

    async updateCategory(id: string, dto: UpdateCategoryDto) {
        const categoryMenuRegisterInDb = await this.model.findFirst({ where: { id } })

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

        await this.model.update({ where: { id }, data })
        return { message: ResponsesEnum.UPDATED_INFO }
    }

    async deleteCategory(restaurantId: string, dto: DeleteCategoryDto) {
        const { many, id } = dto
        if (many) {
            await this.model.deleteMany({ where: { restaurantId } })

        } else if (id) {
            const categoryMenuRegisterInDb = await this.model.findFirst({ where: { id, restaurantId } })

            if (!categoryMenuRegisterInDb) {
                throw new NotFoundException(ResponsesEnum.CATEGORY_NOT_FOUND)
            }
        } else {
            throw new BadRequestException(ResponsesEnum.INVALID_BODY_OF_REQUEST)
        }
        await this.model.delete({ where: { id } })
        return { message: ResponsesEnum.CATEGORY_DELETED }
    }
    async validCategories(restaurantId: string, ids: string[]) {
        let valid: boolean = true
        for (let i = 0; i < ids.length; i++) {
            try {
                console.log(i)
                await this.getCategory(restaurantId, ids[i])
            }
            catch (err) {
                valid = false
                break
            }
        }
        return valid
    }

}
