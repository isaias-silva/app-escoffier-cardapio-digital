import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { MenuService } from '../../services/menu/menu.service';
import { Request } from 'express';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { CommonMenuDto, DeleteMenuDto, ResponseMenuDto } from '../../dtos/menu.dtos';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BasicResponseDto } from '../../dtos/basic.response.dto';

@Controller('menu')
@ApiTags('Menu management')

export class MenuController {

    constructor(private readonly menuService: MenuService) {

    }

    @Get('/all/:id/:page/:count')

    @ApiOperation({ summary: 'get a menu', description: 'get a menu by ID' })

    @ApiResponse({ status: 404, description: 'menu not found.', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'menu object.', type: ResponseMenuDto })
   
    async getMenu(@Req() req: Request, @Param('id') id: string, @Param('count') count: string, @Param('page') page: string) {
        return await this.menuService.getMenu(id, parseInt(count), parseInt(page), req['apiurl'],req['access_time'])
    }


    @Get('/my/:page/:count')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()

    @ApiOperation({ summary: 'get your menus', description: 'get all menus of a restaurant' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'menus array.', type: ResponseMenuDto, isArray: true })

    async getAllRestaurantMenus(@Req() req: Request, @Param('count') count: string, @Param('page') page: string) {
        return await this.menuService.getRestaurantMenus(req['auth'].id, parseInt(count), parseInt(page))
    }

    @Post('/create')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()

    @ApiOperation({ summary: 'create a menu', description: 'create a restaurant menu' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in json of body`s request.', type: BasicResponseDto })
    @ApiResponse({ status: 201, description: 'menus created', type: BasicResponseDto })

    async createRestaurantMenu(@Req() req: Request, @Body() body: CommonMenuDto) {
        return await this.menuService.createMenu(req['auth'].id, body)
    }

    @Put('/:id/update')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()

    @ApiOperation({ summary: 'update a menu', description: 'update a your menu by ID' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in json of body`s request.', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'updated menu', type: BasicResponseDto })

    async updateRestaurantMenu(@Req() req: Request, @Param('id') id: string, @Body() body: CommonMenuDto) {
        return await this.menuService.updateMenu(req['auth'].id, id, body)
    }

    @Delete('/delete')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()

    @ApiOperation({ summary: 'delete one or all menus', description: 'delete one or all of your restaurant`s ' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in json of body`s request.', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'deleted menu', type: BasicResponseDto })

    async deleteRestaurantMenu(@Req() req: Request, @Body() body: DeleteMenuDto) {
        return await this.menuService.deleteMenu(req['auth'].id, body)
    }


}
