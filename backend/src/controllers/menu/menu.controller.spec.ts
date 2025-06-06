import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from '../../services/menu/menu.service';
import { Request } from 'express';
import { CommonMenuDto, DeleteMenuDto} from '../../dtos/menu.dtos';

import { JwtModule } from '@nestjs/jwt';

describe('MenuController', () => {
  let controller: MenuController;
  let service: MenuService;
  const mockReq: Request = {} as Request;
  mockReq['auth'] = { id: 'user-id-mock' };
  mockReq['apiurl'] = { id: 'host-mock' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [MenuController],
      providers: [{
        provide: MenuService,
        useValue: {
          getMenu: jest.fn(),
          getRestaurantMenus: jest.fn(),
          createMenu: jest.fn(),
          updateMenu: jest.fn(),
          deleteMenu: jest.fn(),
        }
      }]
    }).compile();

    controller = module.get<MenuController>(MenuController);
    service = module.get<MenuService>(MenuService);
  });

  it('controller and service are valid', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getMenuInRealTime method', () => {
    it('should get a menu in real time', async () => {
      await controller.getMenuInRealTime(mockReq, 'test-id', '1', '1');
      expect(service.getMenu).toHaveBeenCalled();
      expect(service.getMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMenu method', () => {
    it('should get a menu', async () => {
      await controller.getMenu(mockReq, 'test-id', '1', '1');
      expect(service.getMenu).toHaveBeenCalled();
      expect(service.getMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllRestaurantMenus method', () => {
    it('should get all restaurant menus', async () => {
      await controller.getAllRestaurantMenus('test-id', '1', '1');
      expect(service.getRestaurantMenus).toHaveBeenCalled();
      expect(service.getRestaurantMenus).toHaveBeenCalledTimes(1);
    });
  });

  describe('createRestaurantMenu method', () => {
    it('should create a restaurant menu', async () => {
      const createMenuDto: CommonMenuDto = {
        name: 'name-mock'
      };
      await controller.createRestaurantMenu(mockReq, createMenuDto);
      expect(service.createMenu).toHaveBeenCalledWith(mockReq['auth'].id, createMenuDto);
      expect(service.createMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateRestaurantMenu method', () => {
    it('should update a restaurant menu', async () => {
      const updateMenuDto: CommonMenuDto = {
        name: 'name-mock'
      };
      await controller.updateRestaurantMenu(mockReq, 'test-id', updateMenuDto);
      expect(service.updateMenu).toHaveBeenCalledWith(mockReq['auth'].id, 'test-id', updateMenuDto);
      expect(service.updateMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteRestaurantMenu method', () => {
    it('should delete a restaurant menu', async () => {
      const deleteMenuDto: DeleteMenuDto = {
        many: false
      };
      await controller.deleteRestaurantMenu(mockReq, deleteMenuDto);
      expect(service.deleteMenu).toHaveBeenCalledWith(mockReq['auth'].id, deleteMenuDto);
      expect(service.deleteMenu).toHaveBeenCalledTimes(1);
    });
  });
});
