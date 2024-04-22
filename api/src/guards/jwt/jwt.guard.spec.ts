import { JwtGuard } from './jwt.guard';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('JwtGuard', () => {
  let guard: JwtGuard;
  let jwtServiceMock: JwtService;

  beforeEach(() => {
    jwtServiceMock = {
      verifyAsync: jest.fn().mockResolvedValue({ payload: { id: 'user-id' } }),
    } as any; 

    guard = new JwtGuard(jwtServiceMock);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if token is valid', async () => {
      const request = { headers: { authorization: 'Bearer valid-token' } } as any; // Mocked request

      const result = await guard.canActivate({ switchToHttp: () => ({ getRequest: () => request }) } as any);

      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException if token is missing', async () => {
      const request = { headers: {} } as any; 

      await expect(guard.canActivate({ switchToHttp: () => ({ getRequest: () => request }) } as any)).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      jwtServiceMock.verifyAsync = jest.fn().mockRejectedValueOnce(new Error('Invalid token'));
      const request = { headers: { authorization: 'Bearer invalid-token' } } as any; // Mocked request

      await expect(guard.canActivate({ switchToHttp: () => ({ getRequest: () => request }) } as any)).rejects.toThrowError(UnauthorizedException);
    });
  });
});
