export class CreateCategoryDto {
    readonly restaurantId: string;
    readonly name: string;
    readonly keywords: string[];
  }
  
  export class UpdateCategoryDto {
    readonly name?: string;
    readonly keywords?: string[];
  }