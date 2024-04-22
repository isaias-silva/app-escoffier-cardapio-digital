import { Test, TestingModule } from '@nestjs/testing';
import { DisheController } from './dishe.controller';
import { DisheService } from '../../services/dishe/dishe.service';
import { Request } from 'express';
import { CreateDisheDto, DeleteDisheDto, UpdateDisheDto } from '../../dtos/dishe.dto';
import { Mode } from '../../enums/mode.dishe.enum';
import { JwtModule } from '@nestjs/jwt';
import {File } from 'buffer';


describe('DisheController', () => {
  let controller: DisheController;
  let service: DisheService;
  const mockReq: Request = {} as Request;
  mockReq['auth'] = { id: 'user-id-mock' }
  mockReq['apiurl'] = { id: 'host-mock' }
  const fileMock:File|any={
    buffer:Buffer.from('mock')
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisheController],
      imports:[JwtModule],
      providers: [{
        
        provide: DisheService,
        useValue: {
          createDishe: jest.fn(),
          getDishe: jest.fn(),
          updateDishe: jest.fn(),
          updateDisheProfile: jest.fn(),
          deleteDishe: jest.fn(),
        }
      }]
    }).compile();

    controller = module.get<DisheController>(DisheController);
    service = module.get<DisheService>(DisheService);
  });

  it('controller and service are valid', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createDishe method', () => {
    it('should create a new dish', async () => {
      const createDisheDto: CreateDisheDto = {
        name: 'test', categoryId: 'test-id',
        menuId: 'test-id',
        price: 0,
        mode: Mode.NIGHT,
        description: 'descriptionId'
      };
      await controller.createDishe(mockReq, createDisheDto);
      expect(service.createDishe).toHaveBeenCalledWith(mockReq['auth'].id, createDisheDto);
      expect(service.createDishe).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDishe method', () => {
    it('should retrieve a dish by ID', async () => {
      const dishId = 'test-id';
      await controller.getDishe(mockReq, dishId);
      expect(service.getDishe).toHaveBeenCalledWith(dishId, mockReq['apiurl']);
      expect(service.getDishe).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateDishe method', () => {
    it('should update a dish', async () => {
      const dishId = 'test-id';
      const updateDisheDto: UpdateDisheDto = {name:'test-update'};
      await controller.updateDishe(mockReq, dishId, updateDisheDto);
      expect(service.updateDishe).toHaveBeenCalledWith(mockReq['auth'].id, dishId, updateDisheDto);
      expect(service.updateDishe).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateDisheProfile method', () => {
    it('should update a dish profile image', async () => {
      const dishId = 'test-id';
    
      await controller.updateDisheProfile(mockReq, dishId,fileMock );
      expect(service.updateDisheProfile).toHaveBeenCalledWith(mockReq['auth'].id, dishId, fileMock.buffer);
      expect(service.updateDisheProfile).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteDishe method', () => {
    it('should delete a dish', async () => {
      const deleteDisheDto: DeleteDisheDto = {
        many: false
      };
      await controller.deleteDishe(mockReq, deleteDisheDto);
      expect(service.deleteDishe).toHaveBeenCalledWith(mockReq['auth'].id, deleteDisheDto);
      expect(service.deleteDishe).toHaveBeenCalledTimes(1);
    });
  });
});