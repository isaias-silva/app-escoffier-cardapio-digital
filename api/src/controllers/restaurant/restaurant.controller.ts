import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { ConfirmCodeRestaurantDto, CreateRestaurantDto, LoginRestaurantDto, ResponseRestaurantDto, UpdatePasswordRestaurantForgottenDto, UpdateRestaurantDto } from '../../dtos/restaurant.dtos';
import { Request } from 'express';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto, BasicResponseDto } from '../../dtos/basic.response.dto';

@Controller('restaurant')
@ApiTags('Restaurant Auth and Management')
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService) {
    }

    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()

    @ApiOperation({ summary: 'Get your restaurant.', description: 'Retrieve information about the authenticated restaurant.' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'restaurant info.', type: ResponseRestaurantDto })

    async getMyRestaurant(@Req() req: Request) {
        return await this.restaurantService.get(req['auth'].id, req['apiurl']);
    }

    @Get('/:id')

    @ApiOperation({ summary: 'Get a specific restaurant.', description: 'Retrieve information about a specific restaurant.' })
    @ApiResponse({ status: 404, description: 'restaurant not found', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'restaurant info.', type: ResponseRestaurantDto })

    async getRestaurant(@Req() req: Request, @Param('id') id: string) {
        return await this.restaurantService.get(id, req['apiurl']);
    }

    @Put('update')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()

    @ApiOperation({ summary: 'Update restaurant information.', description: 'Update the information of the authenticated restaurant.' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'restaurant updated.', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in request body', type: BasicResponseDto })

    async updateRestaurant(@Body() dto: UpdateRestaurantDto, @Req() req: Request) {
        return await this.restaurantService.update(req['auth'].id, dto);
    }

    @Put('update/profile')
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiBearerAuth()

    @ApiOperation({ summary: 'Update restaurant profile image.', description: 'Update the profile image of the authenticated restaurant.' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'restaurant profile updated', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in upload image', type: BasicResponseDto })

    async updateRestaurantProfile(@Req() req: Request, @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image' }),
            new MaxFileSizeValidator({ maxSize: 1e+7, message: 'Image too large, max 10mb' })
        ]
    })) file?: Express.Multer.File) {

        return await this.restaurantService.updateImage(req['auth'].id, file.buffer, 'profile');
    }

    @Put('update/background')
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiBearerAuth()

    @ApiOperation({ summary: 'Update restaurant profile image.', description: 'Update the background image of the authenticated restaurant.' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'restaurant background updated', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in upload image', type: BasicResponseDto })

    async updateRestaurantBackground(@Req() req: Request, @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image' }),
            new MaxFileSizeValidator({ maxSize: 1e+7, message: 'Image too large, max 10mb' })
        ]
    })) file?: Express.Multer.File) {

        return await this.restaurantService.updateImage(req['auth'].id, file.buffer, 'background');
    }



    @Put('update/password/forgotten')

    @ApiOperation({ summary: 'Update forgotten password', description: 'Update the forgotten password of the restaurant.' })
    @ApiResponse({ status: 404, description: 'restaurant not found', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'email sent to reset password', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in request body', type: BasicResponseDto })


    async forgottenPassword(@Body() body: UpdatePasswordRestaurantForgottenDto) {
        return await this.restaurantService.changePasswordForgotten(body);
    }

    @Put('confirm/code')

    @ApiOperation({ summary: 'Confirm change with code.', description: 'Confirm a change using a code.' })
    @ApiResponse({ status: 401, description: 'incorrect code', type: BasicResponseDto })
    @ApiResponse({ status: 404, description: 'restaurant not found', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'changes have been confirmed', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in request body', type: BasicResponseDto })

    async confirmChangeWithCode(@Body() body: ConfirmCodeRestaurantDto) {
        return this.restaurantService.confirmChange(body);
    }

    @Post('/register')

    @ApiOperation({ summary: 'Register a new restaurant.', description: 'Register a new restaurant account.' })

    @ApiResponse({ status: 404, description: 'restaurant not found', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 201, description: 'restaurant registed', type: AuthResponseDto })
    @ApiResponse({ status: 400, description: 'error in request body', type: BasicResponseDto })

    async register(@Body() dto: CreateRestaurantDto) {
        return await this.restaurantService.register(dto);
    }

    @Post('/login')

    @ApiOperation({ summary: 'Login to a restaurant account.', description: 'Authenticate and login to a restaurant account.' })
    @ApiResponse({ status: 401, description: 'incorrect password', type: BasicResponseDto })
    @ApiResponse({ status: 404, description: 'restaurant not found', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 201, description: 'login successful', type: AuthResponseDto })
    @ApiResponse({ status: 400, description: 'error in request body', type: BasicResponseDto })

    async login(@Body() dto: LoginRestaurantDto) {
        return await this.restaurantService.login(dto);
    }

    @Delete('cancel/account')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()

    @ApiOperation({ summary: 'Delete restaurant account.', description: 'Delete the authenticated restaurant account.' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 404, description: 'restaurant not found', type: BasicResponseDto })
    @ApiResponse({ status: 500, description: 'internal error', type: BasicResponseDto })
    @ApiResponse({ status: 200, description: 'account deleted', type: AuthResponseDto })

    async deleteRestaurantAccount(@Req() req: Request) {
        return await this.restaurantService.delete(req['auth'].id);
    }
}
