import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { ResponsesEnum } from "../enums/responses.enum";

export class CommonMenuDto {
  @IsNotEmpty({ message: ResponsesEnum.NAME_REQUIRED })
  @MaxLength(30, { message: ResponsesEnum.NAME_IS_LONG })
  @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })
  readonly name: string;
}
export class DeleteMenuDto {

  @IsOptional()
  @MinLength(12, { message: ResponsesEnum.INVALID_ID })
  readonly id?: string

  @IsNotEmpty({ message: ResponsesEnum.MANY_BOOLEAN_IS_REQUIRED })
  readonly many: boolean
}