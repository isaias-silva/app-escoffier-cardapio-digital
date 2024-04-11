import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../../services/category/category.service';
import { JwtGuard } from '../../guards/jwt/jwt.guard';

import { CommonCategoryDto, CreateCategoryDto, DeleteCategoryDto, UpdateCategoryDto } from '../../dtos/category.dto';
import { Request } from 'express';
import { BasicResponseDto } from '../../dtos/basic.response.dto';

@Controller('category')
@UseGuards(JwtGuard)
@ApiTags('Categories of dishes')
@ApiBearerAuth()
export class CategoryController {

    constructor(private categoryService: CategoryService) {

    }
    @Post('create')

    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category created successfully' })
    @ApiBody({ type: CreateCategoryDto })
    async createCategory(@Req() req: Request, @Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.createCategory(req['auth'].id, createCategoryDto);
    }

    @Get('my/:id')
    @ApiOperation({ summary: 'Get a category by ID' })
    @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 404, description: 'Category not found' })

    async getCategory(@Req() req: Request, @Param('id') id:string) {
        return await this.categoryService.getCategory(req['auth'].id,id )
    }

    @Get('categories')
    @ApiOperation({ summary: 'Get categories for the authenticated user' })
    @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })

    async getMyCategories(@Req() req: Request) {
        return await this.categoryService.getMyCategories(req['auth'].id);
    }

    @Put('update/:id')

    @ApiOperation({ summary: 'Update a category' })

    @ApiResponse({ status: 200, description: 'Category updated successfully' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in request body', type: BasicResponseDto })

    async updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return await this.categoryService.updateCategory(id, updateCategoryDto);
    }

    @Delete('delete')

    @ApiOperation({ summary: 'Delete a category by ID or all(use with caution)' })
    @ApiResponse({ status: 200, description: 'Category deleted successfully' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiResponse({ status: 401, description: 'not authorized', type: BasicResponseDto })
    @ApiResponse({ status: 400, description: 'error in request body', type: BasicResponseDto })

    async deleteCategory(@Req() req: Request, @Body() deleteCategoryDto: DeleteCategoryDto) {
        return await this.categoryService.deleteCategory(req['auth'].id, deleteCategoryDto);
    }

   
}
