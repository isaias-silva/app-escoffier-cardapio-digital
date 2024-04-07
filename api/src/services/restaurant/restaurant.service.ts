import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { OrmService } from '../orm/orm.service';
import { CreateRestaurantDto, LoginRestaurantDto, UpdateRestaurantDto } from '../../dtos/restaurant.dtos';
import { ResponsesEnum } from '../../enums/responses.enum';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../cache/cache.service';
import { FileService } from '../file/file.service';
import { MessageMailEnum, SubjectMailEnum } from '../../enums/email.templates.enum';

@Injectable()
export class RestaurantService {
    constructor(
        private OrmService: OrmService,
        private mailService: MailService,
        private jwtService: JwtService,
        private cacheService: CacheService,
        private fileService: FileService
    ) { }

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

        const restaurant = await this.model.create({ data: { name, email, password } })

        const { id } = restaurant

        const token = await this.jwtService.signAsync({ id })

        this.mailService.makeHtmlMailAndSend('default',
            restaurant.name,
            restaurant.email,
            SubjectMailEnum.WELLCOME,
            MessageMailEnum.WELLCOME)

        return { message: ResponsesEnum.REGISTERED_RESTAURANT, token }


    }

    async get(id: string, host: string) {
        const restaurant = await this.model.findFirst({ where: { id } })
        if (!restaurant) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }
        let profile
        if (restaurant.profile) {

            profile = await this.fileService.getImage(`${id}.png`, host)

            if (!profile) {
                await this.fileService.writeImage(`${id}.png`, restaurant.profile)
            }
        }
        const { name, resume, email } = restaurant
        return { profile, name, resume, email }
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
        this.fileService.writeImage(`${id}.png`, data)

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

        this.mailService.makeHtmlMailAndSend('default',
            exist.name,
            exist.email,
            SubjectMailEnum.CODE,
            MessageMailEnum.CODE_NEW_MAIL,
            code)


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

        this.mailService.makeHtmlMailAndSend('code',
            exist.name,
            exist.email,
            SubjectMailEnum.CODE,
            MessageMailEnum.CODE_NEW_MAIL,
            code)
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
                this.model.update({ where: { id: exist.id }, data: { email: objectChanges['email'] } })

                this.mailService.makeHtmlMailAndSend('default',
                    exist.name,
                    objectChanges['email'],
                    SubjectMailEnum.NEW_MAIL,
                    MessageMailEnum.NEW_MAIL,)

            }

            if (objectChanges['password']) {

                this.model.update({ where: { id: exist.id }, data: { password: objectChanges['password'] } })

                this.mailService.makeHtmlMailAndSend('default',
                    exist.name,
                    exist.email,
                    SubjectMailEnum.NEW_PASSWORD,
                    MessageMailEnum.NEW_PASSWORD,)

            }
            this.cacheService.clearCache(exist.id)

            return { message: ResponsesEnum.UPDATED_INFO }

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
