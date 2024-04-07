import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ResponsesEnum } from '../../enums/responses.enum';



@Injectable()
export class JwtGuard implements CanActivate {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) { }


  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(ResponsesEnum.ACCESS_DENIED);
    }
    try {
      const decrypted = await this.jwtService.verifyAsync(token);

      request['auth'] = decrypted.payload;
      

    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}