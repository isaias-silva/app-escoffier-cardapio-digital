import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    })
      .overrideProvider(CacheService)
      .useValue({
      
        async onModuleInit() {},
        async setCache(key: string, value: any) {},
        async getCache(key: string) {},
        async clearCache(key: string) {}
      })
      .compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setCache', () => {
    it('should set cache data', () => {
      const key = 'test-key';
      const value = 'test-value';
      service.setCache(key, value);
     });
  });

  describe('getCache', () => {
    it('should get cache data', async () => {
     
      const key = 'test-key';
      await service.getCache(key);
      });
  });

  describe('clearCache', () => {
    it('should clear cache data', () => {
      
      const key = 'test-key';
      service.clearCache(key);
    
    });
  });
});