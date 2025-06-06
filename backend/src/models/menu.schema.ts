import { Prop, Schema } from "@nestjs/mongoose";
import { IMenu } from "../interfaces/menu.interface";

@Schema()
export class Menu implements IMenu {
    @Prop()
    restaurantId: string;

    @Prop()
    name: String;
}