import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { ConfirmCodeRestaurantDto, CreateRestaurantDto, LoginRestaurantDto, UpdatePasswordRestaurantForgottenDto, UpdateRestaurantDto } from '../../dtos/restaurant.dtos';
import { Request } from 'express';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('restaurant')
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService) {
    }

    @Get()
    @UseGuards(JwtGuard)
    async getMyRestaurant(@Req() req: Request) {

        return await this.restaurantService.get(req['auth'].id, req['apiurl'])
    }

    @Get('/:id')

    async getRestaurant(@Req() req: Request, @Param('id') id: string) {

        return await this.restaurantService.get(id, req['apiurl'])
    }

    @Put('update')
    @UseGuards(JwtGuard)
    async updateRestaurant(@Body() dto: UpdateRestaurantDto, @Req() req: Request) {
        return await this.restaurantService.update(req['auth'].id, dto)
    }


    @Put('update/profile')
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('file'))

    async updateRestaurantProfile(@Req() req: Request, @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image' }),
            new MaxFileSizeValidator({ maxSize: 2e+7, message: 'imagem muito grande' })
        ],

    })) file?: Express.Multer.File) {

        return await this.restaurantService.updateProfile(req['auth'].id, file.buffer)
    }

    @Put('update/password/forgotten')

    async forgottenPassword(@Body() body: UpdatePasswordRestaurantForgottenDto) {

        return await this.restaurantService.changePasswordForgotten(body)
    }

    @Put('confirm/code')

    async confirmChangeWithCode(@Body() body: ConfirmCodeRestaurantDto) {

        return this.restaurantService.confirmChange(body)
    }


    @Post('/register')

    async register(@Body() dto: CreateRestaurantDto) {
        return await this.restaurantService.register(dto)

    }

    @Post('/login')
    async login(@Body() dto: LoginRestaurantDto) {

        return await this.restaurantService.login(dto)

    }

    @Delete('cancel/account')
    @UseGuards(JwtGuard)
    async deleteRestaurantAccount(@Req() req: Request) {

        return await this.restaurantService.delete(req['auth'].id)
    }


}
