export interface Restaurant {
    "profile"?: string,
    "background"?: string,
    "name": string,
    "resume"?: string,
    "email": string,
    "id": string,
    "rule":'NORMAL'|'ADMIN'
    "pallete"?: {
        main: string,
        primary: string,
        secondary: string,
        font: string,
        
    }
    "createdAt":string
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
    }
}