import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { CreateDisheDto, DeleteDisheDto, UpdateDisheDto } from '../../dtos/dishe.dto';
import { DisheService } from '../../services/dishe/dishe.service';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { BasicResponseDto } from '../../dtos/basic.response.dto';

@Controller('dishe')
@ApiTags('Dishes management')

export class DisheController {
    constructor(private disheService: DisheService) {
    }

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new dish' })
    @ApiResponse({ status: 201, description: 'Dish created successfully', type: BasicResponseDto })
    @ApiBody({ type: CreateDisheDto })

    async createDishe(@Req() req: Request, @Body() createDisheDto: CreateDisheDto) {
        return await this.disheService.createDishe(req['auth'].id, createDisheDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a dish by ID' })
    @ApiResponse({ status: 200, description: 'Dish retrieved successfully', type: BasicResponseDto })
    @ApiResponse({ status: 404, description: 'Dish not found', type: BasicResponseDto })
    @ApiParam({ name: 'id', type: String, required: true })
    async getDishe(@Req() req: Request, @Param('id') id: string) {
        return await this.disheService.getDishe(req["apiurl"], id);
    }

    @Put('update/:id')
    @UseGuards(JwtGuard)

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a dish' })
    @ApiResponse({ status: 200, description: 'Dish updated successfully' })
    @ApiResponse({ status: 404, description: 'Dish not found' })

    async updateDishe(@Req() req: Request, @Param('id') id: string, @Body() updateDisheDto: UpdateDisheDto) {
        return await this.disheService.updateDishe(req['auth'].id, id, updateDisheDto);
    }

    @Put('update/:id/image')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Update a dish profile image' })
    @ApiResponse({ status: 200, description: 'Dish image uploaded successfully' })
    @ApiResponse({ status: 404, description: 'Dish not found' })


    async updateDisheProfile(@Req() req: Request, @Param('id') id: string, @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image' }),
            new MaxFileSizeValidator({ maxSize: 2e+7, message: 'Image too large' })
        ]
    })) file?: Express.Multer.File) {

        return await this.disheService.updateDisheProfile(req['auth'].id, id, file.buffer);
    }

    @Delete('delete/:id')
    @UseGuards(JwtGuard)

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete one dishe or all dishes' })
    @ApiResponse({ status: 200, description: 'Dish deleted successfully' })
    @ApiResponse({ status: 404, description: 'Dish not found' })

    async deleteDishe(@Req() req: Request, @Body() deleteDisheDto: DeleteDisheDto) {
        return await this.disheService.deleteDishe(req['auth'].id, deleteDisheDto);
    }

}
