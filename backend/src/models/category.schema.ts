import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ICategory } from "../interfaces/category.interface";

@Schema()
export class Category implements ICategory {
    @Prop()
    restaurantId: string;
    @Prop()
    name: string;
    @Prop()
    keywords: string[];

}

export const CategorySchema = SchemaFactory.createForClass(Category)