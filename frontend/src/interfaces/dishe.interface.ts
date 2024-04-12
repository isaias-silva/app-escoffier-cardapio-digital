export interface CreateDishe {
  "menuId": string,
  "name": string,
  "price": number,
  "mode": 'night' | 'mornning',
  "description": string,
  "categoryId": string
}

export interface UpdateDishe {
  "menuId"?: string,
  "name"?: string,
  "price"?: number,
  "mode"?: 'night' | 'mornning',
  "description"?: string,
  "categoryId"?: string
}

export interface Dishe {
  "name"?: string,
  "price"?: number,
  "mode"?: 'night' | 'mornning',
  "description"?: string,
  "categoryId"?: string,
  "image": string,
}
export interface DeleteDishe {
  id?: string,
  many: boolean
}
