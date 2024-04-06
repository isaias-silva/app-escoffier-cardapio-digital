import { Mode } from "../enums/mode.dishe.enum";

export class CreateDisheDto {
    readonly menuId: string;
    readonly name: string;
    readonly price: number;
    readonly image?: Buffer;
    readonly mode: Mode;
    readonly description: string;
    readonly categories: string[];
  }
  
  export class UpdateDisheDto {
    readonly name?: string;
    readonly price?: number;
    readonly image?: Buffer;
    readonly mode?: Mode;
    readonly description?: string;
    readonly categories?: string[];
  }