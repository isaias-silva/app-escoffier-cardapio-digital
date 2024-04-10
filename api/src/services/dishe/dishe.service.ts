import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrmService } from '../orm/orm.service';
import { FileService } from '../file/file.service';
import { CreateDisheDto, DeleteDisheDto, UpdateDisheDto } from '../../dtos/dishe.dto';
import { ResponsesEnum } from '../../enums/responses.enum';

@Injectable()
export class DisheService {
    constructor(private ormService: OrmService,
        private fileService: FileService) {
    }
    private model = this.ormService.dishe

    async createDishe(restaurantId: string, dto: CreateDisheDto) {

    }

    async getDishe(id: string) { }

    async getMenuDishes(menuId: string, count: number, page: number) {

    }

    async updateDishe(restaurantId: string, id: string, dto: UpdateDisheDto) {

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
