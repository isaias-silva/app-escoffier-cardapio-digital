import { IsEmail, IsHexColor, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { ResponsesEnum } from "../enums/responses.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantDto {

    @ApiProperty()
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    @IsNotEmpty({ message: ResponsesEnum.MAIL_REQUIRED })
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty({ message: ResponsesEnum.NAME_REQUIRED })
    @MaxLength(30, { message: ResponsesEnum.NAME_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })
    readonly name: string;


    @ApiProperty()
    @IsNotEmpty({ message: ResponsesEnum.PASSWORD_REQUIRED })
    @MaxLength(20, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })
    readonly password: string;
}

export class LoginRestaurantDto {
    @ApiProperty()
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    @IsNotEmpty({ message: ResponsesEnum.MAIL_REQUIRED })
    readonly email: string;


    @ApiProperty()
    @IsNotEmpty({ message: ResponsesEnum.PASSWORD_REQUIRED })
    @MaxLength(20, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })
    readonly password: string;

}

export class UpdateRestaurantDto {

    @ApiProperty()
    @IsOptional()
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })

    readonly email?: string;

    @ApiProperty()
    @IsOptional()
    @MaxLength(30, { message: ResponsesEnum.NAME_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })
    readonly name?: string;


    @ApiProperty()
    @IsOptional()
    @MaxLength(300, { message: ResponsesEnum.RESUME_IS_LONG })
    @MinLength(10, { message: ResponsesEnum.RESUME_IS_SHORT })
    readonly resume?: string;

    @ApiProperty()
    @IsOptional({ message: ResponsesEnum.PASSWORD_REQUIRED })
    @MaxLength(20, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })
    readonly password?: string;
}

export class UpdatePasswordRestaurantForgottenDto {

    @ApiProperty()
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    @IsNotEmpty({ message: ResponsesEnum.MAIL_REQUIRED })
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty({ message: ResponsesEnum.PASSWORD_REQUIRED })
    @MaxLength(20, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @MinLength(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })

    readonly new_password: string;

}

export class ConfirmCodeRestaurantDto {
    @ApiProperty()
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    @IsNotEmpty({ message: ResponsesEnum.MAIL_REQUIRED })
    readonly email: string;



    @ApiProperty()
    @IsNotEmpty({ message: ResponsesEnum.INVALID_CODE })
    readonly code: string;

}


export class ResponseRestaurantDto {
    @ApiProperty()
    profile?: string;

    @ApiProperty()
    background?: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    resume?: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    id: string;

    @ApiProperty()
    rule: 'NORMAL' | 'ADMIN';

    @ApiProperty()
    createdAt: Date
}

export class UpdatePalleteDto {

    @ApiProperty()
    @IsOptional()
    @IsHexColor()
    main: string;

    @ApiProperty()
    @IsOptional()
    @IsHexColor({message:ResponsesEnum.INVALID_HEX_COLOR})
    primary: string;

    @ApiProperty()
    @IsOptional()
    @IsHexColor({message:ResponsesEnum.INVALID_HEX_COLOR})
    secondary: string;

    @ApiProperty()
    @IsOptional()
    @IsHexColor({message:ResponsesEnum.INVALID_HEX_COLOR})
    font: string;

    @ApiProperty()
    @IsOptional()
    @IsHexColor({message:ResponsesEnum.INVALID_HEX_COLOR})
    hover: string;

}