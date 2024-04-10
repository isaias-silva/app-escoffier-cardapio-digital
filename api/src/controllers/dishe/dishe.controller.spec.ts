import { Test, TestingModule } from '@nestjs/testing';
import { DisheController } from './dishe.controller';

describe('DisheController', () => {
  let controller: DisheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisheController],
    }).compile();

    controller = module.get<DisheController>(DisheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
