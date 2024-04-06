import { Injectable } from '@nestjs/common';
import { OrmService } from '../orm/orm.service';

@Injectable()
export class RestaurantService {
    constructor(private OrmService:OrmService){}

    async register(){

    }
   
    async validateMail(){

    }
    
    async update(){

    }
   
    async updateProfile(){

    }
   
    async changePassword(){

    }
    async confirmChangePassword(){

    }

    async delete(){}

    
}
