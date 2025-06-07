export interface IRestaurant {
    email: string
    name: string
    password: string
    resume: string
    profile: string
    background: string
    pallete: {
        main: String
        primary: String
        secondary: String
        font: String
    }
    rule: 'NORMAL' | 'ADMIN'

}