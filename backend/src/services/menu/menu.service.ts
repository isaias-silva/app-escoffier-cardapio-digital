import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CommonMenuDto, DeleteMenuDto } from '../../dtos/menu.dtos';
import { ResponsesEnum } from '../../enums/responses.enum';
import { DisheService } from '../dishe/dishe.service';
import { Mode } from '../../enums/mode.dishe.enum';
import * as moment from "moment-timezone"
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from '../../models/menu.schema';

@Injectable()
export class MenuService {

    constructor(
        @InjectModel(Menu.name) private readonly model: Model<Menu>,
        private disheService: DisheService) {

    }



    async createMenu(restaurantId: string, dto: CommonMenuDto) {
        const { name } = dto
        const menuInDb = await this.model.findOne({
            name,
            restaurantId
        })

        if (menuInDb) {
            throw new BadRequestException(ResponsesEnum.MENU_NAME_ALREADY_EXISTS)
        }
        await this.model.create({ name, restaurantId })

        return { message: ResponsesEnum.MENU_CREATED }

    }

    async getMenu(_id: string,
        countDishes: number,
        pageDishes: number,
        host: string,
        date?: moment.Moment,
        categoryId?: string) {

        const hour = date ? date.hours() : null
        const mode = hour ? (hour >= 18 || hour < 4 ? Mode.NIGHT : Mode.MORNNING) : undefined

        console.log("aqui")
        const [menu, dishes] = await Promise.all([
            this.model.findOne({ _id }),
            this.disheService.getMenuDishes(_id, countDishes, pageDishes, host, mode, categoryId)
        ]
        )

        console.log("aqui")
        if (!menu) {
            throw new NotFoundException(ResponsesEnum.MENU_NOT_FOUND)
        }


        return { ...menu, dishes }
    }
    async getRestaurantMenus(restaurantId: string, count: number, page: number) {
        return await this.model.find({ restaurantId })
    }

    async updateMenu(restaurantId: string, _id: string, dto: CommonMenuDto) {
        const { name } = dto
        const [menuInDb, menuNameInDb] = await Promise.all([this.model.findOne({
            _id,
            restaurantId

        }),
        this.model.findOne({
            restaurantId,
            name
        })])


        if (!menuInDb) {
            throw new NotFoundException(ResponsesEnum.MENU_NOT_FOUND)

        }
        if (menuNameInDb) {
            throw new BadRequestException(ResponsesEnum.MENU_NAME_ALREADY_EXISTS)

        }

        await this.model.updateOne({ _id }, { name })

        return { message: ResponsesEnum.MENU_UPDATED }

    }

    async deleteMenu(restaurantId: string, dto: DeleteMenuDto) {
        const { many, id } = dto
        if (many) {
            await this.model.deleteMany({ restaurantId })
        }
        else if (id) {
            const menuInDb = await this.model.findOne({
                _id:id,
                restaurantId
            })
            if (!menuInDb) {
                throw new NotFoundException(ResponsesEnum.MENU_NOT_FOUND)
            }

            await this.model.deleteOne({ _id:id })

        } else {
            throw new BadRequestException(ResponsesEnum.INVALID_BODY_OF_REQUEST)
        }
        return { message: ResponsesEnum.MENU_DELETED }
    }

}
