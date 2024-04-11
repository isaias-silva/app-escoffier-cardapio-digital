import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as moment from "moment-timezone"




@Injectable()
export class ExtractDateAccessMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const zone = req.headers['accept-language']?.split(',')[0]

        const countryTime = moment(new Date()).locale((zone||'pt-br').toLowerCase())
    
        req['access_time'] = countryTime
        next();
    }
}

