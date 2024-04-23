import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class ExtractURLMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const protocol = req.protocol;
    const host = req.get('host');
    const domain = `${protocol}://${host}`;

    console.log(req.method + " " +req.baseUrl)
    req["apiurl"] = domain


    next();
  }
}