import { BadRequestException, Injectable } from '@nestjs/common';
import { OrmService } from '../orm/orm.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../../dtos/restaurant.dtos';
import { ResponsesEnum } from '../../enums/responses.enum';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RestaurantService {
    constructor(private OrmService: OrmService,
        private mailService: MailService,
        private jwtService: JwtService) { }

    private model = this.OrmService.restaurant

    async register(dto: CreateRestaurantDto) {
        const { name, email } = dto
        const exist = await this.model.findFirst({
            where: {
                OR: [
                    { name },
                    { email }
                ]
            }
        })
        if (exist) {
            throw new BadRequestException(ResponsesEnum.RESTAURANT_ALREADY_EXISTS)
        }
        const password = bcrypt.hashSync(dto.password, 10)

        const user = await this.model.create({ data: { name, email, password } })
        const { id } = user

        const token = await this.jwtService.signAsync({ id })
     
        return { message: ResponsesEnum.REGISTERED_RESTAURANT, token }


    }

    async update(_id: string, dto: UpdateRestaurantDto) {

    }

    async updateProfile(_id: string, data: Buffer) {

    }

    async changePassword(_id: string, new_password: string) {

    }

    async changeMail(_id: string, new_mail: string) {

    }

    async confirmChange(_id: string, code: string) {

    }



    async delete(_id: string) {

    }


}
