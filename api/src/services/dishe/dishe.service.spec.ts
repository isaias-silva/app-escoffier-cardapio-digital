import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DisheService } from './dishe.service';
import { OrmService } from '../orm/orm.service';
import { FileService } from '../file/file.service';
import { CategoryService } from '../category/category.service';
import { CreateDisheDto, DeleteDisheDto, UpdateDisheDto } from '../../dtos/dishe.dto';
import { ResponsesEnum } from '../../enums/responses.enum';
import { Mode } from '../../enums/mode.dishe.enum';

describe('DisheService', () => {
  let service: DisheService;
  let ormServiceMock: any;
  let fileServiceMock: any;
  let categoryServiceMock: any;

  beforeEach(() => {
    ormServiceMock = {
      dishe: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
      },
    };

    fileServiceMock = {
      getImage: jest.fn(),
      writeImage: jest.fn(),
    };

    categoryServiceMock = {
      validCategories: jest.fn().mockResolvedValue(true),
      getCategory: jest.fn().mockResolvedValue({name:'mock-category', id:'id-mock',keywords:[]}),
    };

    service = new DisheService(ormServiceMock, fileServiceMock, categoryServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createDishe', () => {
    it('should create a dishe', async () => {
      const dto: CreateDisheDto = {
        name: 'Test Dishe',
        price: 10,
        description: 'Test description',
        mode: Mode.MORNNING,
        categoryId: 'categoryId',
        menuId: 'menuId',
      };
      ormServiceMock.dishe.findFirst.mockResolvedValue(null);
      categoryServiceMock.validCategories.mockResolvedValue(true);

      await expect(service.createDishe('restaurantId', dto)).resolves.toEqual({
        message: ResponsesEnum.DISHE_CREATED,
        id:'id-dishe'
      });

      expect(ormServiceMock.dishe.findFirst).toHaveBeenCalledWith({
        where: { restaurantId: 'restaurantId', name: 'Test Dishe' },
      });
      expect(categoryServiceMock.validCategories).toHaveBeenCalledWith('restaurantId', 'categoryId');
      expect(ormServiceMock.dishe.create).toHaveBeenCalledWith({
        data: { restaurantId: 'restaurantId', ...dto },
      });
    });

    it('should throw BadRequestException if dishe already exists', async () => {
      const dto: CreateDisheDto = {
        name: 'Test Dishe',
        price: 10,
        description: 'Test description',
        mode: Mode.MORNNING,
        categoryId: 'categoryId',
        menuId: 'menuId',
      };
      ormServiceMock.dishe.findFirst.mockResolvedValue({});

      await expect(service.createDishe('restaurantId', dto)).rejects.toThrowError(
        new BadRequestException(ResponsesEnum.DISHE_ALREADY_EXISTS),
      );
    });

    it('should throw BadRequestException if categories are invalid', async () => {
      const dto: CreateDisheDto = {
        name: 'Test Dishe',
        price: 10,
        description: 'Test description',
        mode: Mode.MORNNING,
        categoryId: 'categoryId',
        menuId: 'menuId',
      };
      ormServiceMock.dishe.findFirst.mockResolvedValue(null);
      categoryServiceMock.validCategories.mockResolvedValue(false);

      await expect(service.createDishe('restaurantId', dto)).rejects.toThrowError(
        new BadRequestException(ResponsesEnum.INVALID_CATEGORIES),
      );
    });

    // Adicione mais testes para diferentes casos
  });

  describe('getDishe', () => {
    it('should get a dishe by id', async () => {
      const disheData = {
        id: 'disheId',
        name: 'Test Dishe',
        price: 10,
        description: 'Test description',
        mode: Mode.MORNNING,
        restaurantId: 'restaurantId',
        menuId: 'menuId',
        categoryId: 'categoryId',
      };
      const categoryData = { id: 'categoryId', name: 'Category', keywords: ['keyword1', 'keyword2'] };
      ormServiceMock.dishe.findFirst.mockResolvedValue(disheData);
      categoryServiceMock.getCategory.mockResolvedValue(categoryData);
      fileServiceMock.getImage.mockResolvedValue('imageData');

      await expect(service.getDishe('disheId', 'host')).resolves.toEqual({
        restaurantId: 'restaurantId',
        menuId: 'menuId',
        name: 'Test Dishe',
        price: 10,
        description: 'Test description',
        mode: Mode.MORNNING,
        image: 'imageData',
        category: { id: 'categoryId', name: 'Category', keywords: ['keyword1', 'keyword2'] },
      });

      expect(ormServiceMock.dishe.findFirst).toHaveBeenCalledWith({ where: { id: 'disheId' } });
      expect(categoryServiceMock.getCategory).toHaveBeenCalledWith('restaurantId', 'categoryId');
      expect(fileServiceMock.getImage).toHaveBeenCalledWith('disheId.png', 'host');
    });

    it('should throw NotFoundException if dishe is not found', async () => {
      ormServiceMock.dishe.findFirst.mockResolvedValue(null);

      await expect(service.getDishe('disheId', 'host')).rejects.toThrowError(
        new NotFoundException(ResponsesEnum.DISHE_NOT_FOUND),
      );
    });

  });

});

