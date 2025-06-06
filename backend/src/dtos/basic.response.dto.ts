import { ApiProperty } from "@nestjs/swagger";
import { ResponsesEnum } from "../enums/responses.enum";

export class BasicResponseDto {
    @ApiProperty()
    readonly message: ResponsesEnum

}

export class AuthResponseDto extends BasicResponseDto {
    @ApiProperty()
    readonly token: string
}
