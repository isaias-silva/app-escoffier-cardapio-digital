import { CreateCategory, DeleteCategory, UpdateCategory } from "../../../interfaces/category.interface";
import axiosConfig from "../axiosConfig";
import { getToken } from "./restaurant.service";




export async function createCategory(createCategoryDto: CreateCategory) {
    const token = getToken()
    const response = await axiosConfig.post('/category/create', createCategoryDto, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export async function getCategory(id: string): Promise<any> {
    const token = getToken()

    const response = await axiosConfig.get(`/category/my/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export async function getMyCategories(): Promise<any> {
    const token = getToken()

    const response = await axiosConfig.get('/category/categories', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export async function updateCategory(id: string, updateCategoryDto: UpdateCategory) {
    const token = getToken()

    const response = await axiosConfig.put(`/category/update/${id}`, updateCategoryDto, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export async function deleteCategory(deleteCategoryDto: DeleteCategory) {
    const token = getToken()

    const response = await axiosConfig.delete('/category/delete', { data: deleteCategoryDto, headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}