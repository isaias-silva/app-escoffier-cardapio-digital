import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { ResponsesEnum } from "../enums/responses.enum";

export class CreateRestaurantDto {
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    @IsNotEmpty({ message: ResponsesEnum.MAIL_REQUIRED })
    readonly email: string;

    @IsNotEmpty({ message: ResponsesEnum.NAME_REQUIRED })
    @MaxLength(20, { message: ResponsesEnum.NAME_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })
    readonly name: string;


    @IsNotEmpty({ message: ResponsesEnum.PASSWORD_REQUIRED })
    @MaxLength(10, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })
    readonly password: string;
}

export class LoginRestaurantDto {
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    @IsNotEmpty({ message: ResponsesEnum.MAIL_REQUIRED })
    readonly email: string;



    @IsNotEmpty({ message: ResponsesEnum.PASSWORD_REQUIRED })
    @MaxLength(10, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })
    readonly password: string;

}

export class UpdateRestaurantDto {

    @IsOptional()
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })

    readonly email?: string;

    @IsOptional()
    @MaxLength(40, { message: ResponsesEnum.NAME_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })
    readonly name?: string;

    @IsOptional()
    @MaxLength(300, { message: ResponsesEnum.RESUME_IS_LONG })
    @MinLength(10, { message: ResponsesEnum.RESUME_IS_SHORT })
    readonly resume?: string;

    @IsOptional({ message: ResponsesEnum.PASSWORD_REQUIRED })
    @MaxLength(10, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })
    readonly password?: string;
}

export class UpdatePasswordRestaurantForgottenDto {
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    @IsNotEmpty({ message: ResponsesEnum.MAIL_REQUIRED })
    readonly email: string;



    @IsNotEmpty({ message: ResponsesEnum.PASSWORD_REQUIRED })
    @MaxLength(10, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })
    readonly new_password: string;

}

export class ConfirmCodeRestaurantDto {
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    @IsNotEmpty({ message: ResponsesEnum.MAIL_REQUIRED })
    readonly email: string;



    @IsNotEmpty({ message: ResponsesEnum.INVALID_CODE })

    readonly code: string;

}