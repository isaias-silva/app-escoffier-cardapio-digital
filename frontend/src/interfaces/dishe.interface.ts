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
  "restaurantId"?: string,
  "menuId"?: string,
  "id": string,
  "name"?: string,
  "price"?: number,
  "mode"?: 'night' | 'mornning',
  "description"?: string,
  "category"?: { name: string, id:string, keywords: string[] },
  "image": string,
}
export interface DeleteDishe {
  id?: string,
  many: boolean
}
