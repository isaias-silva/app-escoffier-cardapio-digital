import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { Request } from 'express';
import { CommonMenuDto, DeleteMenuDto } from '../../dtos/menu.dtos';
import { JwtModule } from '@nestjs/jwt';
import { ConfirmCodeRestaurantDto, CreateRestaurantDto, LoginRestaurantDto, UpdatePasswordRestaurantForgottenDto, UpdateRestaurantDto } from '../../dtos/restaurant.dtos';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;
  const mockReq: Request = {} as Request;
  mockReq['auth'] = { id: 'user-id-mock' };
  mockReq['apiurl'] = { id: 'host-mock' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [RestaurantController],
      providers: [{
        provide: RestaurantService,
        useValue: {
          get: jest.fn(),
          update: jest.fn(),
          updateProfile: jest.fn(),
          changePasswordForgotten: jest.fn(),
          confirmChange: jest.fn(),
          register: jest.fn(),
          login: jest.fn(),
          delete: jest.fn(),
        }
      }]
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  it('controller and service are valid', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getMyRestaurant method', () => {
    it('should get the authenticated restaurant', async () => {
      await controller.getMyRestaurant(mockReq);
      expect(service.get).toHaveBeenCalledWith(mockReq['auth'].id, mockReq['apiurl']);
      expect(service.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRestaurant method', () => {
    it('should get a specific restaurant', async () => {
      const restaurantId = 'test-id';
      await controller.getRestaurant(mockReq, restaurantId);
      expect(service.get).toHaveBeenCalledWith(restaurantId, mockReq['apiurl']);
      expect(service.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateRestaurant method', () => {
    it('should update restaurant information', async () => {
      const updateRestaurantDto: UpdateRestaurantDto = {name:'mock-name'};
     
      await controller.updateRestaurant(updateRestaurantDto, mockReq);
      expect(service.update).toHaveBeenCalledWith(mockReq['auth'].id, updateRestaurantDto);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateRestaurantProfile method', () => {
    it('should update restaurant profile image', async () => {
   
      const fileMock: any = { buffer: Buffer.from('mock') };
      await controller.updateRestaurantProfile(mockReq, fileMock);
      expect(service.updateProfile).toHaveBeenCalledWith(mockReq['auth'].id, fileMock.buffer);
      expect(service.updateProfile).toHaveBeenCalledTimes(1);
    });
  });

  describe('forgottenPassword method', () => {
    it('should update forgotten password', async () => {
      const updatePasswordDto: UpdatePasswordRestaurantForgottenDto= {
        email: 'mail@mock.com',
        new_password: 'newpass123'
      };
      await controller.forgottenPassword(updatePasswordDto);
      expect(service.changePasswordForgotten).toHaveBeenCalledWith(updatePasswordDto);
      expect(service.changePasswordForgotten).toHaveBeenCalledTimes(1);
    });
  });

  describe('confirmChangeWithCode method', () => {
    it('should confirm change with code', async () => {
      const confirmCodeDto: ConfirmCodeRestaurantDto = {
        email: 'mail@mock.com',
        code: 'code123mock'
      };
      await controller.confirmChangeWithCode(confirmCodeDto);
      expect(service.confirmChange).toHaveBeenCalledWith(confirmCodeDto);
      expect(service.confirmChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('register method', () => {
    it('should register a new restaurant', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        email: 'mail@mock.com',
        name: 'mock-name',
        password: 'mock1234'
      };
      await controller.register(createRestaurantDto);
      expect(service.register).toHaveBeenCalledWith(createRestaurantDto);
      expect(service.register).toHaveBeenCalledTimes(1);
    });
  });

  describe('login method', () => {
    it('should login to a restaurant account', async () => {
      const loginRestaurantDto: LoginRestaurantDto= {
        email: 'mail@mock.com',
        password: 'mock123#'
      };
      await controller.login(loginRestaurantDto);
      expect(service.login).toHaveBeenCalledWith(loginRestaurantDto);
      expect(service.login).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteRestaurantAccount method', () => {
    it('should delete restaurant account', async () => {
      await controller.deleteRestaurantAccount(mockReq);
      expect(service.delete).toHaveBeenCalledWith(mockReq['auth'].id);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});