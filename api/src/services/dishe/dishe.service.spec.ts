import { Test, TestingModule } from '@nestjs/testing';
import { DisheService } from './dishe.service';

describe('DisheService', () => {
  let service: DisheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisheService],
    }).compile();

    service = module.get<DisheService>(DisheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
