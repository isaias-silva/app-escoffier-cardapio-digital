import { IsEmail, IsNotEmpty, IsOptional, Max, Min } from "class-validator";
import { ResponsesEnum } from "../enums/responses.enum";

export class CreateRestaurantDto {
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    @IsNotEmpty({ message: ResponsesEnum.MAIL_REQUIRED })
    readonly email: string;

    @IsNotEmpty({ message: ResponsesEnum.NAME_REQUIRED })
    @Max(40, { message: ResponsesEnum.NAME_IS_LONG })
    @Min(4, { message: ResponsesEnum.NAME_IS_SHORT })
    readonly name: string;


    @IsNotEmpty({ message: ResponsesEnum.PASSWORD_REQUIRED })
    @Max(10, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @Min(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })
    readonly password: string;
}

export class UpdateRestaurantDto {

    @IsOptional()
    @IsEmail({}, { message: ResponsesEnum.INVALID_MAIL })
    
    readonly email?: string;
    
    @IsOptional()
    @Max(40, { message: ResponsesEnum.NAME_IS_LONG })
    @Min(4, { message: ResponsesEnum.NAME_IS_SHORT })
    readonly name?: string;
    
    @IsOptional()
    @Max(10, { message: ResponsesEnum.PASSWORD_IS_LONG })
    @Min(4, { message: ResponsesEnum.PASSWORD_IS_SHORT })
    readonly password?: string;
}