import { CanActivate, ExecutionContext, ForbiddenException, HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { ResponsesEnum } from '../../enums/responses.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@Inject(RestaurantService) private readonly restaurantService: RestaurantService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    if (!request['auth']) {
      return false
    }
    try {
      const restaurant = await this.restaurantService.get(request['auth'].id, 'none')
      if (restaurant.rule != 'ADMIN') {
           throw new ForbiddenException(ResponsesEnum.ACCESS_DENIED)
      }
      return true

    } catch (err) {
      throw new HttpException(err.message || "internal error", err.status || 500)
    }
 
  }
}
