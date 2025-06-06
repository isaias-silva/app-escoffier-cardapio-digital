import { ApiProperty } from "@nestjs/swagger";
import { ResponsesEnum } from "../enums/responses.enum";
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CommonCategoryDto {

  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.ID_REQUIRED })
  readonly id: string;

}
export class DeleteCategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.MANY_BOOLEAN_IS_REQUIRED })
  readonly many: boolean
  
  @ApiProperty()
  @IsOptional()
  readonly id?: string;
}
export class CreateCategoryDto {

  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.NAME_REQUIRED })
  @MaxLength(30, { message: ResponsesEnum.NAME_IS_LONG })
  @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })

  readonly name: string;

  @ApiProperty()
  readonly keywords: string[];
}

export class UpdateCategoryDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(30, { message: ResponsesEnum.NAME_IS_LONG })
  @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })

  readonly name?: string;
  @ApiProperty()
  readonly keywords?: string[];
}