import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { OrmService } from '../orm/orm.service';
import { CreateRestaurantDto, LoginRestaurantDto, UpdateRestaurantDto } from '../../dtos/restaurant.dtos';
import { ResponsesEnum } from '../../enums/responses.enum';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class RestaurantService {
    constructor(private OrmService: OrmService,
        private mailService: MailService,
        private jwtService: JwtService,
        private cacheService: CacheService) { }

    private model = this.OrmService.restaurant

    async login(dto: LoginRestaurantDto) {
        const { password, email } = dto
        const exist = await this.model.findFirst({
            where: {
                email
            }
        })
        if (!exist) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }

        const correctPassword = bcrypt.compareSync(password, exist.password)

        if (correctPassword) {
            const token = await this.jwtService.signAsync({ id: exist.id })

            return { message: ResponsesEnum.LOGIN_SUCCESSFUL, token }
        } else {
            throw new ForbiddenException(ResponsesEnum.INCORRECT_PASSWORD)
        }

    }

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

    async get(id: string) {
        const restaurant = await this.model.findFirst({ where: { id } })
        if (!restaurant) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }
        return restaurant
    }
    async update(id: string, dto: UpdateRestaurantDto) {
        const exist = await this.model.findFirst({
            where: {
                id
            }
        })
        if (!exist) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }
        const { email, name, resume, password } = dto

        const updatedInfo = { name, resume }


        if (updatedInfo['name'] || updatedInfo['resume']) {

            this.model.update({
                where: {
                    id
                },
                data: updatedInfo
            })

        }
        if (password) {
            this.changePassword(id, password)
        }
        if (email) {
            this.changeMail(exist.id, email)
            return { message: ResponsesEnum.VERIFY_CODE_TO_NEW_EMAIL }
        }


        return { message: ResponsesEnum.UPDATED_INFO }


    }

    async updateProfile(id: string, data: Buffer) {
        const exist = await this.model.findFirst({
            where: { id }
        })
        if (!exist) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }

        this.model.update({
            where: { id }, data: {
                profile: data
            }
        })
        return { message: ResponsesEnum.PROFILE_UPDATED }
    }

    async changePassword(id: string, new_password: string) {
        const exist = await this.model.findFirst({
            where: { id }
        })
        if (!exist) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }
        const password = bcrypt.hashSync(new_password, 10)

        this.model.update({
            where: { id }, data: {
                password
            }
        })
    }

    async changePasswordForbidden(email: string, new_password: string) {
        const exist = await this.model.findFirst({
            where: { email }
        })
        if (!exist) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }
        const code = Math.random().toString(27).replace(/0./g, 'ESC')
        const password = bcrypt.hashSync(new_password, 10)

        this.cacheService.setCache(exist.id, { password, code: bcrypt.hashSync(code, 10) })

        return {
            message: ResponsesEnum.VERIFY_CODE_TO_EMAIL
        }
    }

    async changeMail(id: string, email: string) {
        const exist = await this.model.findFirst({
            where: { email }
        })
        if (!exist) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }
        const code = Math.random().toString(27).replace(/0./g, 'ESC')

        this.cacheService.setCache(id, { email, code: bcrypt.hashSync(code, 10) })
    }


    async confirmChange(email: string, code: string) {
        const exist = await this.model.findFirst({
            where: {
                email
            }
        })

        if (!exist) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }

        const changesString = await this.cacheService.getCache(exist.id)

        if (!changesString) {
            throw new BadRequestException(ResponsesEnum.NOT_HAVE_CHANGES)
        }

        const objectChanges = JSON.parse(changesString)

        if (bcrypt.compareSync(code, objectChanges.code)) {
            if (objectChanges['email']) {
                await this.model.update({ where: { id: exist.id }, data: { email: objectChanges['email'] } })
            }

            if (objectChanges['password']) {
                await this.model.update({ where: { id: exist.id }, data: { password: objectChanges['password'] } })

            }
            this.cacheService.clearCache(exist.id)

        } else {
            throw new ForbiddenException(ResponsesEnum.INVALID_CODE)
        }

    }




    async delete(id: string) {

        const exist = await this.model.findFirst({
            where: {
                id
            }
        })

        if (!exist) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }

        this.model.delete({ where: { id } })
    
        //deletes de todos cardapios
    
        return { message: ResponsesEnum.DELETED_RESTAURANT }
    }



}
