import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IMenu } from "../interfaces/menu.interface";

@Schema()
export class Menu implements IMenu {
    @Prop()
    restaurantId: string;

    @Prop()
    name: String;
}



export const MenuSchema = SchemaFactory.createForClass(Menu)