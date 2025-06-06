import { Test, TestingModule } from '@nestjs/testing';
import { ExtractURLMiddleware } from './extract.url.middleware';
;

describe('ExtractURLMiddleware', () => {
  let middleware: ExtractURLMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtractURLMiddleware],
    }).compile();

    middleware = module.get<ExtractURLMiddleware>(ExtractURLMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    it('should set apiurl in request', () => {
      const req = {protocol:'http', get:(key:string)=>key} as any;
      const res = {} as any;
      const next = jest.fn();
      middleware.use(req, res, next);

      expect(req['apiurl']).toBeDefined();
      expect(typeof req['apiurl']).toBe('string');
    });

    it('should set apiurl with correct domain', () => {
      const req = {
        protocol: 'http',
        get: jest.fn().mockReturnValue('example.com'),
      } as any; 
      const res = {} as any; 
      const next = jest.fn(); 

      middleware.use(req, res, next);

      expect(req['apiurl']).toBe('http://example.com');
    });
  });
});