import { Dishe } from "./dishe.interface"

export interface MenuData {
    name: string
}


export interface MenuResponse {
    "id": string,
    "restaurantId": string,
    "name": string,
    dishes?: Dishe[]
}
