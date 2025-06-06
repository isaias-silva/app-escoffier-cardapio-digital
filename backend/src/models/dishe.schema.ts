import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IDishe } from "../interfaces/dishe.interface";

@Schema()
export class Dishe implements IDishe {

    @Prop()
    menuId: String;

    @Prop()
    restaurantId: string;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    image: string;

    @Prop()
    mode: "MORNNING";

    @Prop()
    description: string;

    @Prop()
    categoryId: string;

    @Prop()
    galery: string[];
}

