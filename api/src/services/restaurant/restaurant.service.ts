import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantService {
    constructor(private prismaService:PrismaService){}

    async register(){}
   
    async validateMail(){}
    
    async update(){}
   
    async updateProfile(){}
   
    async delete(){}

    
}
