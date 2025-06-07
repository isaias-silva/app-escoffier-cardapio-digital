import { Dishe } from "./dishe.interface"

export interface MenuData {
    name: string
}


export interface MenuResponse {
    "_id": string,
    "restaurantId": string,
    "name": string,
    dishes?: Dishe[]
}
