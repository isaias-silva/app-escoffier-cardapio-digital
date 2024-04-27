export interface Restaurant {
    "profile"?: string,
    "background"?: string,
    "name": string,
    "resume"?: string,
    "email": string,
    "id": string
}
export interface RestaurantUpdate {

    "name"?: string,
    "resume"?: string,
    "email"?: string,
    "password"?: string
}