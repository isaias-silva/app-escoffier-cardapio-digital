import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { MenuService } from '../../services/menu/menu.service';
import { Request } from 'express';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { CommonMenuDto, DeleteMenuDto } from '../../dtos/menu.dtos';

@Controller('menu')
export class MenuController {

    constructor(private readonly menuService: MenuService) {

    }

    @Get('/all/:id')
    async getMenu(@Param('id') id: string) {
        return await this.menuService.getMenu(id)
    }

    @Get('/my/:page/:count')
    @UseGuards(JwtGuard)

    async getAllRestaurantMenus(@Req() req: Request, @Param('count') count: string, @Param('page') page: string) {
        return await this.menuService.getRestaurantMenus(req['auth'].id, parseInt(count), parseInt(page))
    }

    @Post('/create')
    @UseGuards(JwtGuard)

    async createRestaurantMenu(@Req() req: Request, @Body() body: CommonMenuDto) {
        return await this.menuService.createMenu(req['auth'].id, body)
    }

    @Put('/:id/update')
    @UseGuards(JwtGuard)

    async updateRestaurantMenu(@Req() req: Request, @Param('id') id: string, @Body() body: CommonMenuDto) {
        return await this.menuService.updateMenu(req['auth'].id, id, body)
    }

    @Delete('/delete')
    @UseGuards(JwtGuard)

    async deleteRestaurantMenu(@Req() req: Request, @Body() body: DeleteMenuDto) {
        return await this.menuService.deleteMenu(req['auth'].id, body)
    }


}
