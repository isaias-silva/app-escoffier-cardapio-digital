import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrmService } from '../orm/orm.service';
import { ConfirmCodeRestaurantDto, CreateRestaurantDto, LoginRestaurantDto, UpdatePasswordRestaurantForgottenDto, UpdateRestaurantDto } from '../../dtos/restaurant.dtos';
import { ResponsesEnum } from '../../enums/responses.enum';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../cache/cache.service';
import { FileService } from '../file/file.service';
import { MessageMailEnum, SubjectMailEnum } from '../../enums/email.templates.enum';
import { MenuService } from '../menu/menu.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class RestaurantService {
    constructor(
        private OrmService: OrmService,

        private mailService: MailService,
        private jwtService: JwtService,
        private cacheService: CacheService,
        private fileService: FileService,

        private menuService: MenuService,
        private categoryService: CategoryService
    ) { }

    private model = this.OrmService.restaurant

    async login(dto: LoginRestaurantDto) {
        const { password, email } = dto
        const restaurantRegisterInDb = await this.model.findFirst({
            where: {
                email
            }
        })
        if (!restaurantRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }

        const correctPassword = bcrypt.compareSync(password, restaurantRegisterInDb.password)

        if (correctPassword) {
            const token = await this.jwtService.signAsync({ payload: { id: restaurantRegisterInDb.id } })

            return { message: ResponsesEnum.LOGIN_SUCCESSFUL, token }
        } else {
            throw new ForbiddenException(ResponsesEnum.INCORRECT_PASSWORD)
        }

    }

    async register(dto: CreateRestaurantDto) {
        const { name, email } = dto
        const restaurantRegisterInDb = await this.model.findFirst({
            where: {
                OR: [
                    { name },
                    { email }
                ]
            }
        })
        if (restaurantRegisterInDb) {
            throw new BadRequestException(ResponsesEnum.RESTAURANT_ALREADY_EXISTS)
        }

        const password = bcrypt.hashSync(dto.password, 10)

        const restaurant = await this.model.create({ data: { name, email, password } })

        const { id } = restaurant

        const token = await this.jwtService.signAsync({ payload: { id } })

        this.mailService.makeHtmlMailAndSend('default',
            restaurant.name,
            restaurant.email,
            SubjectMailEnum.WELCOME,
            MessageMailEnum.WELCOME)

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
        return { profile, name, resume, email, id }
    }


    async update(id: string, dto: UpdateRestaurantDto) {
        const restaurantRegisterInDb = await this.model.findFirst({
            where: {
                id
            }
        })
        if (!restaurantRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }

        const { email, password, name, resume } = dto


        const infosInUse = await this.model.findFirst({
            where: {
                OR: [
                    { name },
                    { email }
                ]
            }
        })

        if (infosInUse) {
            throw new BadRequestException(ResponsesEnum.EMAIL_OR_NAME_ALREADY_EXISTS)
        }

        const data = {
            name: name != restaurantRegisterInDb.name ? dto.name : undefined,
            resume: resume != restaurantRegisterInDb.resume ? dto.resume : undefined
        }

        if (data.name || data.resume) {
            await this.model.update({
                where: {
                    id
                },
                data

            })
        }

        if (password) {
            this.changePassword(id, password)
        }

        if (email && email != restaurantRegisterInDb.email) {
            this.changeMail(restaurantRegisterInDb.id, email)
            return { message: ResponsesEnum.VERIFY_CODE_TO_NEW_EMAIL }
        }


        return { message: ResponsesEnum.UPDATED_INFO }

    }

    async updateProfile(id: string, data: Buffer) {
        const restaurantRegisterInDb = await this.model.findFirst({
            where: { id }
        })
        if (!restaurantRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }

        await this.model.update({
            where: { id }, data: {
                profile: data
            }
        })
        this.fileService.writeImage(`${id}.png`, data)

        return { message: ResponsesEnum.PROFILE_UPDATED }
    }

    async changePassword(id: string, new_password: string) {
        const restaurantRegisterInDb = await this.model.findFirst({
            where: { id }
        })
        if (!restaurantRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }
        const password = bcrypt.hashSync(new_password, 10)

        await this.model.update({
            where: { id }, data: {
                password
            }
        })
    }

    async changePasswordForgotten(dto: UpdatePasswordRestaurantForgottenDto) {
        const { new_password, email } = dto
        const restaurantRegisterInDb = await this.model.findFirst({
            where: { email }
        })
        if (!restaurantRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }
        const code = Math.random().toString(27).replace(/0./g, 'ESC')
        const password = bcrypt.hashSync(new_password, 10)

        this.cacheService.setCache(restaurantRegisterInDb.id, { password, code: bcrypt.hashSync(code, 10) })

        this.mailService.makeHtmlMailAndSend('code',
            restaurantRegisterInDb.name,
            restaurantRegisterInDb.email,
            SubjectMailEnum.CODE,
            MessageMailEnum.CODE_NEW_MAIL,
            code)


        return {
            message: ResponsesEnum.VERIFY_CODE_TO_EMAIL
        }
    }

    async changeMail(id: string, email: string) {
        const restaurantRegisterInDb = await this.model.findFirst({
            where: { id }
        })

        if (!restaurantRegisterInDb) {
            return
        }

        const code = Math.random().toString(27).replace(/0./g, 'ESC')

        this.cacheService.setCache(id, { email, code: bcrypt.hashSync(code, 10) })

        this.mailService.makeHtmlMailAndSend('code',
            restaurantRegisterInDb.name,
            email,
            SubjectMailEnum.CODE,
            MessageMailEnum.CODE_NEW_MAIL,
            code)
    }

    async confirmChange(dto: ConfirmCodeRestaurantDto) {
        const { code, email } = dto
        const restaurantRegisterInDb = await this.model.findFirst({
            where: {
                email
            }
        })

        if (!restaurantRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }

        const changesString = await this.cacheService.getCache(restaurantRegisterInDb.id)

        if (!changesString) {
            throw new BadRequestException(ResponsesEnum.NOT_HAVE_CHANGES)
        }

        const objectChanges = JSON.parse(changesString)

        if (bcrypt.compareSync(code, objectChanges.code)) {
            if (objectChanges['email']) {
                await this.model.update({ where: { id: restaurantRegisterInDb.id }, data: { email: objectChanges['email'] } })

                this.mailService.makeHtmlMailAndSend('default',
                    restaurantRegisterInDb.name,
                    objectChanges['email'],
                    SubjectMailEnum.NEW_MAIL,
                    MessageMailEnum.NEW_MAIL,)

            }

            if (objectChanges['password']) {

                await this.model.update({ where: { id: restaurantRegisterInDb.id }, data: { password: objectChanges['password'] } })

                this.mailService.makeHtmlMailAndSend('default',
                    restaurantRegisterInDb.name,
                    restaurantRegisterInDb.email,
                    SubjectMailEnum.NEW_PASSWORD,
                    MessageMailEnum.NEW_PASSWORD,)

            }
            this.cacheService.clearCache(restaurantRegisterInDb.id)

            return { message: ResponsesEnum.UPDATED_INFO }

        } else {

            throw new ForbiddenException(ResponsesEnum.INVALID_CODE)
        }

    }

    async delete(id: string) {

        const restaurantRegisterInDb = await this.model.findFirst({
            where: {
                id
            }
        })

        if (!restaurantRegisterInDb) {
            throw new NotFoundException(ResponsesEnum.RESTAURANT_NOT_FOUND)
        }

        this.fileService.unlinkImage(`${id}.png`)

        await this.model.delete({ where: { id } })

        Promise.all([
            this.categoryService.deleteCategory(id,{ many: true}),
            
            this.menuService.deleteMenu(id, { many: true })
        ])

        return { message: ResponsesEnum.DELETED_RESTAURANT }
    }



}
