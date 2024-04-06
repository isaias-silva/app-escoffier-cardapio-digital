import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantService {
    constructor(private prismaService:PrismaService){

        
    }
}
