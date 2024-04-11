import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../../services/category/category.service';
import { JwtModule } from '@nestjs/jwt';
import { ResponsesEnum } from '../../enums/responses.enum';
import { Request, request } from 'express';
import { Category } from '@prisma/client';
import { CreateCategoryDto, DeleteCategoryDto, UpdateCategoryDto } from '../../dtos/category.dto';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;
  const mockReq: Request = request
  const mockCategory: Category = {
    id: 'test',
    name: 'test-category',
    restaurantId: 'test-restaurant',
    keywords: []
  }
  mockReq['auth'] = { id: 'user-id-mock' }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [CategoryController,
      ],
      providers: [{
        provide: CategoryService,
        useValue: {
          createCategory: jest.fn().mockResolvedValue({ message: ResponsesEnum.CATEGORY_CREATED }),
          getCategory: jest.fn().mockResolvedValue(mockCategory),
          getMyCategories: jest.fn().mockResolvedValue([mockCategory]),
          updateCategory: jest.fn().mockResolvedValue({ message: ResponsesEnum.UPDATED_INFO }),
          deleteCategory: jest.fn().mockResolvedValue({ message: ResponsesEnum.CATEGORY_DELETED }),
          validCategory: jest.fn().mockResolvedValue(true)

        }
      }
      ]
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService)
  });

  it('controller and service are valid:', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined()
  });

  describe('get methods:', () => {
    it('get a category', async () => {

      let result = await controller.getCategory(mockReq, 'test-id')

      expect(result).toEqual(mockCategory)
      expect(service.getCategory).toHaveBeenCalledWith(mockReq['auth'].id, 'test-id')
      expect(service.getCategory).toHaveBeenCalledTimes(1)

    })

    it('get my categories', async () => {

      let result = await controller.getMyCategories(mockReq)

      expect(result).toEqual([mockCategory])
      expect(service.getMyCategories).toHaveBeenCalledWith(mockReq['auth'].id)
      expect(service.getMyCategories).toHaveBeenCalledTimes(1)

    })
  })
  describe('post methods:', () => {
    it('create category', async () => {

      const createCategoryMock: CreateCategoryDto = { name: 'test-category', keywords: [] }
      let result = await controller.createCategory(mockReq, createCategoryMock)

      expect(result).toEqual({ message: ResponsesEnum.CATEGORY_CREATED })
      expect(service.createCategory).toHaveBeenCalledWith(mockReq['auth'].id, createCategoryMock)
      expect(service.createCategory).toHaveBeenCalledTimes(1)

    })

  })
  describe('put methods:', () => {

    it('update category', async () => {

      const updateCategoryMock: UpdateCategoryDto = { name: 'test-category', keywords: [] }
      let result = await controller.updateCategory(mockReq, 'test-id', updateCategoryMock)

      expect(result).toEqual({ message: ResponsesEnum.UPDATED_INFO })

      expect(service.updateCategory).toHaveBeenCalledWith(mockReq['auth'].id, 'test-id', updateCategoryMock)

      expect(service.updateCategory).toHaveBeenCalledTimes(1)

    }
    )
  })
  describe('delete methods:', () => {

    it('delete category', async () => {

      const deleteCategoryMock: DeleteCategoryDto = { id: 'test-id', many: false }
      let result = await controller.deleteCategory(mockReq, deleteCategoryMock)

      expect(result).toEqual({ message: ResponsesEnum.CATEGORY_DELETED })

      expect(service.deleteCategory).toHaveBeenCalledWith(mockReq['auth'].id, deleteCategoryMock)

      expect(service.deleteCategory).toHaveBeenCalledTimes(1)

    })
  })

});
