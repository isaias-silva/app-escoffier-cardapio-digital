import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrmService } from '../orm/orm.service';
import { CommonMenuDto, DeleteMenuDto } from '../../dtos/menu.dtos';
import { ResponsesEnum } from '../../enums/responses.enum';
import { DisheService } from '../dishe/dishe.service';
import { Mode } from '../../enums/mode.dishe.enum';
import * as moment from "moment-timezone"

@Injectable()
export class MenuService {

    constructor(private ormService: OrmService,
        private disheService: DisheService) {

    }
    private model = this.ormService.menu


    async createMenu(restaurantId: string, dto: CommonMenuDto) {
        const { name } = dto
        const menuInDb = await this.model.findFirst({
            where: {
                name,
                restaurantId
            }
        })
        if (menuInDb) {
            throw new BadRequestException(ResponsesEnum.MENU_NAME_ALREADY_EXISTS)
        }
        await this.model.create({ data: { name, restaurantId } })

        return { message: ResponsesEnum.MENU_CREATED }

    }

    async getMenu(id: string,
        countDishes: number,
        pageDishes: number,
        host: string,
        date?: moment.Moment,
        categoryId?: string) {

        const hour = date ? date.hours() : null
        const mode = hour ? (hour >= 18 || hour < 4 ? Mode.NIGHT : Mode.MORNNING) : undefined

        const [menu, dishes] = await Promise.all([
            this.model.findFirst({ where: { id } }),
            this.disheService.getMenuDishes(id, countDishes, pageDishes, host, mode, categoryId)
        ]
        )
        if (!menu) {
            throw new NotFoundException(ResponsesEnum.MENU_NOT_FOUND)
        }


        return { ...menu, dishes }
    }
    async getRestaurantMenus(restaurantId: string, count: number, page: number) {
        return await this.model.findMany({
            where: { restaurantId },
            take: count,
            skip: (page - 1) * count
        })
    }

    async updateMenu(restaurantId: string, id: string, dto: CommonMenuDto) {
        const { name } = dto
        const [menuInDb, menuNameInDb] = await Promise.all([this.model.findFirst({
            where: {
                id,
                restaurantId
            }
        }),
        this.model.findFirst({
            where: {
                restaurantId,
                name
            }
        })])

        if (!menuInDb) {
            throw new NotFoundException(ResponsesEnum.MENU_NOT_FOUND)

        }
        if (menuNameInDb) {
            throw new BadRequestException(ResponsesEnum.MENU_NAME_ALREADY_EXISTS)

        }

        await this.model.update({ where: { id }, data: { name } })

        return { message: ResponsesEnum.MENU_UPDATED }

    }

    async deleteMenu(restaurantId: string, dto: DeleteMenuDto) {
        const { many, id } = dto
        if (many) {
            await this.model.deleteMany({ where: { restaurantId } })
        }
        else if (id) {
            const menuInDb = await this.model.findFirst({
                where: {
                    id,
                    restaurantId
                }

            })
            if (!menuInDb) {
                throw new NotFoundException(ResponsesEnum.MENU_NOT_FOUND)
            }

            await this.model.delete({ where: { id } })

        } else {
            throw new BadRequestException(ResponsesEnum.INVALID_BODY_OF_REQUEST)
        }
        return { message: ResponsesEnum.MENU_DELETED }
    }

}
