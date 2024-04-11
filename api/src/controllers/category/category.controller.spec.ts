import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../../services/category/category.service';
import { JwtModule } from '@nestjs/jwt';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [CategoryController,
      ],
      providers: [{
        provide: CategoryService,
        useValue: {
          createCategory: jest.fn(),
          getCategory: jest.fn(),
          getMyCategories: jest.fn(),
          updateCategory: jest.fn(),
          deleteCategory: jest.fn(),
          validCategory: jest.fn()

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
});
