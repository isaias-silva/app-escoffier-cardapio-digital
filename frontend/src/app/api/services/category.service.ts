import { CreateCategory, DeleteCategory, UpdateCategory } from "../../../interfaces/category.interface";
import axiosConfig from "../axiosConfig";




export async function createCategory(createCategoryDto: CreateCategory) {
    const response = await axiosConfig.post('/category/create', createCategoryDto);
    return response.data;
}

export async function getCategory(id: string): Promise<any> {
    const response = await axiosConfig.get(`/category/my/${id}`);
    return response.data;
}

export async function getMyCategories(): Promise<any> {
    const response = await axiosConfig.get('/category/categories');
    return response.data;
}

export async function updateCategory(id: string, updateCategoryDto: UpdateCategory) {
    const response = await axiosConfig.put(`/category/update/${id}`, updateCategoryDto);
    return response.data;
}

export async function deleteCategory(deleteCategoryDto: DeleteCategory) {
    const response = await axiosConfig.delete('/category/delete', { data: deleteCategoryDto });
    return response.data;
}