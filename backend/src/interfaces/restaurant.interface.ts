export interface IRestaurant {
    email: string
    name: string
    password: string
    resume: string
    profile: string
    background: string
    pallete: {
        main: string
        primary: string
        secondary: string
        font: string
    }
    rule: 'NORMAL' | 'ADMIN'

}