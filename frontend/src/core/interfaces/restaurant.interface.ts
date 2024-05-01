export interface Restaurant {
    "profile"?: string,
    "background"?: string,
    "name": string,
    "resume"?: string,
    "email": string,
    "id": string,
    "pallete"?: {
        main: string,
        primary: string,
        secondary: string,
        font: string,
        hover: string,
    }
}
export interface RestaurantUpdate {

    "name"?: string,
    "resume"?: string,
    "email"?: string,
    "password"?: string,
    "pallete"?: {
        main: string,
        primary: string,
        secondary: string,
        font: string,
        hover: string,
    }
}