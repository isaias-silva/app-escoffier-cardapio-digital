import { ApiProperty } from "@nestjs/swagger";

export class CommonCategoryDto {
 
  @ApiProperty()

  readonly id: string;

}
export class DeleteCategoryDto {
  @ApiProperty()

  readonly many: boolean
  @ApiProperty()
  readonly id?: string;
}
export class CreateCategoryDto {
  
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly keywords: string[];
}

export class UpdateCategoryDto {
 @ApiProperty()
  readonly name?: string;
 @ApiProperty()
  readonly keywords?: string[];
}