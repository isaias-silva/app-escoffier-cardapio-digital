import { ApiProperty } from "@nestjs/swagger";
import { Mode } from "../enums/mode.dishe.enum";
import { IsNotEmpty, IsOptional, MaxLength, Min, MinLength } from "class-validator";
import { ResponsesEnum } from "../enums/responses.enum";

export class CreateDisheDto {
  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.MENU_ID_IS_REQUIRED })
  readonly menuId: string;

  @ApiProperty()

  @IsNotEmpty({ message: ResponsesEnum.NAME_REQUIRED })
  @MaxLength(30, { message: ResponsesEnum.NAME_IS_LONG })
  @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.DISHE_PRICE_REQUIRED })
  @Min(1, { message: ResponsesEnum.VERY_LOW_PRICE })
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.DISHE_MODE_REQUIRED })

  readonly mode: Mode;

  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.DISHE_DESCRIPTION_REQUIRED })
  @MaxLength(300, { message: ResponsesEnum.RESUME_IS_LONG })
  @MinLength(10, { message: ResponsesEnum.RESUME_IS_SHORT })
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.CATEGORIES_REQUIRED })
  readonly categoryId: string;
}

export class UpdateDisheDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(30, { message: ResponsesEnum.NAME_IS_LONG })
  @MinLength(4, { message: ResponsesEnum.NAME_IS_SHORT })
  readonly name?: string;

  @ApiProperty()
  @IsOptional()
  @Min(1, { message: ResponsesEnum.VERY_LOW_PRICE })

  readonly price?: number;

  @ApiProperty()
  @IsOptional()
  readonly mode?: Mode;

  @ApiProperty()
  @IsOptional()
  @MaxLength(300, { message: ResponsesEnum.RESUME_IS_LONG })
  @MinLength(10, { message: ResponsesEnum.RESUME_IS_SHORT })
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  readonly categoryId?: string;
}


export class DeleteDisheDto {
  @ApiProperty()
  @IsNotEmpty({ message: ResponsesEnum.MANY_BOOLEAN_IS_REQUIRED })

  readonly many: boolean
  @ApiProperty()
  @IsOptional()
  readonly id?: string;
}