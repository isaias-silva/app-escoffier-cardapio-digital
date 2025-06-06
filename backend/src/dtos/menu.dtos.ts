import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { ResponsesEnum } from "../enums/responses.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CommonMenuDto {
  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.NAME_REQUIRED })
  @MaxLength(30, { message: ResponsesEnum.NAME_IS_LONG })
  @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })
  readonly name: string;
}

export class DeleteMenuDto {
  @ApiProperty()
  @IsOptional()
  @MinLength(12, { message: ResponsesEnum.INVALID_ID })
  readonly id?: string

  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.MANY_BOOLEAN_IS_REQUIRED })
  readonly many: boolean
}

export class ResponseMenuDto {
  @ApiProperty()
 readonly id: string;
 @ApiProperty()
 readonly restaurantId: string;
 @ApiProperty()
 readonly name: string;
}