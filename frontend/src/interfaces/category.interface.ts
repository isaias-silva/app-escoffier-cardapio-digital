export interface CreateCategory {
    "name": string,
    "keywords": string[
    ]
}

export interface UpdateCategory {
    "name": string,
    "keywords": string[
    ]
}

export interface DeleteCategory {
    id?: string
    many:boolean
}