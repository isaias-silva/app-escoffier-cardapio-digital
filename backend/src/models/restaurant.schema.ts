import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
    @Prop({ type: Object })
    pallete: { 
        main: String; 
        primary: String; 
        secondary: String; 
        font: String; 
    };
    @Prop()
    rule: "NORMAL" | "ADMIN";
     @Prop()
     createdAt:String

}


export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)