import { Test, TestingModule } from '@nestjs/testing';
import { ExtractDateAccessMiddleware } from './extract.date.access.middleware';
import * as moment from 'moment-timezone';

describe('ExtractDateAccessMiddleware', () => {
  let middleware: ExtractDateAccessMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtractDateAccessMiddleware],
    }).compile();

    middleware = module.get<ExtractDateAccessMiddleware>(ExtractDateAccessMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    it('should set access_time in request', () => {
      const req = {
        headers: {
          'accept-language': 'en-US',
        },
      } as any;
      const res = {} as any;
      const next = jest.fn();

      middleware.use(req, res, next);

      expect(req['access_time']).toBeDefined();
      expect(moment.isMoment(req['access_time'])).toBeTruthy();
    });

    it('should set access_time with default timezone (pt-br) if accept-language header is not provided', () => {
      const req = {
        headers: {},
      } as any; 
      const res = {} as any; 
      const next = jest.fn();

      middleware.use(req, res, next);

      expect(req['access_time']).toBeDefined();
      expect(moment.isMoment(req['access_time'])).toBeTruthy();
    });
  });
});
