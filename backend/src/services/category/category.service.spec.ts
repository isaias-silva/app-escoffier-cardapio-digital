import { CategoryService } from './category.service';
import { OrmService } from '../orm/orm.service';
import { ResponsesEnum } from '../../enums/responses.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto } from '../../dtos/category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let ormServiceMock: any;

  beforeEach(() => {
    ormServiceMock = {
      category: {
        findFirst: jest.fn().mockResolvedValue({ id: 'test-id' }),
        findMany: jest.fn().mockResolvedValue([{ id: 'test-id' }]),
        create: jest.fn().mockResolvedValue({ message: 'success' }),
        update: jest.fn().mockResolvedValue({ message: 'success' }),
        delete: jest.fn().mockResolvedValue({ message: 'success' }),
        deleteMany: jest.fn().mockResolvedValue({ message: 'success' }),
      },
    };

    service = new CategoryService(ormServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should create a category', async () => {
      const dto: CreateCategoryDto = {
        name: 'Test Category',
        keywords: [],
      };
      ormServiceMock.category.findFirst.mockResolvedValue(null);

      await expect(service.createCategory('restaurantId', dto)).resolves.toEqual({
        message: ResponsesEnum.CATEGORY_CREATED,
      });

      expect(ormServiceMock.category.findFirst).toHaveBeenCalledWith({
        where: { name: dto.name, restaurantId: 'restaurantId' },
      });
      expect(ormServiceMock.category.create).toHaveBeenCalledWith({
        data: { restaurantId: 'restaurantId', ...dto },
      });
    });

    it('should throw BadRequestException if category already exists', async () => {
      const dto: CreateCategoryDto = {
        name: 'Test Category',
        keywords: [],
      };
      ormServiceMock.category.findFirst.mockResolvedValue({});

      await expect(service.createCategory('restaurantId', dto)).rejects.toThrowError(
        new BadRequestException(ResponsesEnum.CATEGORY_ALREADY_EXISTS_IN_RESTAURANT),
      );
    });
  });

  describe('getCategory', () => {
    it('should get a category by restaurantId and id', async () => {
      ormServiceMock.category.findFirst.mockResolvedValue({ id: 'test-id' });

      await expect(service.getCategory('restaurantId', 'categoryId')).resolves.toEqual({ id: 'test-id' });

      expect(ormServiceMock.category.findFirst).toHaveBeenCalledWith({
        where: { restaurantId: 'restaurantId', id: 'categoryId' },
      });
    });

    it('should throw NotFoundException if category is not found', async () => {
      ormServiceMock.category.findFirst.mockResolvedValue(null);

      await expect(service.getCategory('restaurantId', 'categoryId')).rejects.toThrowError(
        new NotFoundException(ResponsesEnum.CATEGORY_NOT_FOUND),
      );
    });
  });

  describe('getMyCategories', () => {
    it('should get all categories by restaurantId', async () => {
      await expect(service.getMyCategories('restaurantId')).resolves.toEqual([{ id: 'test-id' }]);

      expect(ormServiceMock.category.findMany).toHaveBeenCalledWith({
        where: { restaurantId: 'restaurantId' },
      });
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const dto: UpdateCategoryDto = {
        name: 'Updated Test Category',
        keywords: ['new', 'keywords'],
      };
      ormServiceMock.category.findFirst.mockResolvedValue({ id: 'test-id', name: 'Old Test Category', keywords: [] });

      await expect(service.updateCategory('restaurantId', 'categoryId', dto)).resolves.toEqual({
        message: ResponsesEnum.UPDATED_INFO,
      });

      expect(ormServiceMock.category.findFirst).toHaveBeenCalledWith({
        where: { id: 'categoryId', restaurantId: 'restaurantId' },
      });
      expect(ormServiceMock.category.update).toHaveBeenCalledWith({
        where: { id: 'categoryId' },
        data: { name: 'Updated Test Category', keywords: ['new', 'keywords'] },
      });
    });

    it('should throw NotFoundException if category is not found', async () => {
      ormServiceMock.category.findFirst.mockResolvedValue(null);

      await expect(service.updateCategory('restaurantId', 'categoryId', {} as UpdateCategoryDto)).rejects.toThrowError(
        new NotFoundException(ResponsesEnum.CATEGORY_NOT_FOUND),
      );
    });

    it('should throw BadRequestException if no changes are provided', async () => {
      ormServiceMock.category.findFirst.mockResolvedValue({ id: 'test-id', name: 'Old Test Category', keywords: [] });

      await expect(service.updateCategory('restaurantId', 'categoryId', {} as UpdateCategoryDto)).rejects.toThrowError(
        new BadRequestException(ResponsesEnum.NOT_HAVE_CHANGES),
      );
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category by id', async () => {
      ormServiceMock.category.findFirst.mockResolvedValue({ id: 'test-id' });

      await expect(service.deleteCategory('restaurantId', { id: 'categoryId',many:false })).resolves.toEqual({
        message: ResponsesEnum.CATEGORY_DELETED,
      });

      expect(ormServiceMock.category.findFirst).toHaveBeenCalledWith({
        where: { id: 'categoryId', restaurantId: 'restaurantId' },
      });
      expect(ormServiceMock.category.delete).toHaveBeenCalledWith({ where: { id: 'categoryId' } });
    });

    it('should delete all categories by restaurantId', async () => {
      await expect(service.deleteCategory('restaurantId', { many: true })).resolves.toEqual({
        message: ResponsesEnum.CATEGORY_DELETED,
      });

      expect(ormServiceMock.category.deleteMany).toHaveBeenCalledWith({ where: { restaurantId: 'restaurantId' } });
    });

    it('should throw NotFoundException if category is not found', async () => {
      ormServiceMock.category.findFirst.mockResolvedValue(null);

      await expect(service.deleteCategory('restaurantId', {
        id: 'categoryId',
        many: false
      })).rejects.toThrowError(
        new NotFoundException(ResponsesEnum.CATEGORY_NOT_FOUND),
      );
    });

  });

  describe('validCategories', () => {
    it('should return true if category is found', async () => {
      ormServiceMock.category.findFirst.mockResolvedValue({ id: 'test-id' });

      await expect(service.validCategories('restaurantId', 'categoryId')).resolves.toBe(true);

      expect(ormServiceMock.category.findFirst).toHaveBeenCalledWith({
        where: { restaurantId: 'restaurantId', id: 'categoryId' },
      });
    });

    it('should return false if category is not found', async () => {
      ormServiceMock.category.findFirst.mockResolvedValue(null);

      await expect(service.validCategories('restaurantId', 'categoryId')).resolves.toBe(false);

      expect(ormServiceMock.category.findFirst).toHaveBeenCalledWith({
        where: { restaurantId: 'restaurantId', id: 'categoryId' },
      });
    });
  });
});
