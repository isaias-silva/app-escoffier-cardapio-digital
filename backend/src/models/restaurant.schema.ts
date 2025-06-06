import { Prop, Schema } from "@nestjs/mongoose";
import { IRestaurant } from "../interfaces/restaurant.interface";

@Schema()
export class Restaurant implements IRestaurant {
    @Prop()
    email: string;
    @Prop()
    name: string;
    @Prop()
    password: string;
    @Prop()
    resume: string;
    @Prop()
    profile: string;
    @Prop()
    background: string;
    @Prop()
    pallete: { main: string; primary: string; secondary: string; font: string; };
    @Prop()
    rule: "NORMAL" | "ADMIN";

}