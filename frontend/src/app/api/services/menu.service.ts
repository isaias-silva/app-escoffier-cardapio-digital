import { MenuData, MenuResponse } from "../../../interfaces/menu.interface";
import { BasicResponses } from "../../../interfaces/response.interfaces";
import axiosConfig from "../axiosConfig";



export async function getMenuInRealTime(id: string, page: number, count: number): Promise<MenuResponse> {
    const response = await axiosConfig.get(`/menu/realtime/${id}/${page}/${count}`);
    return response.data;
}

export async function getMenu(id: string, page: number, count: number, category?: string): Promise<MenuResponse> {
    const response = await axiosConfig.get(`/menu/dishes/${id}/${page}/${count}`, {
        params: { category }
    });
    return response.data;
}
export async function getAllRestaurantMenus(page: number, count: number): Promise<MenuResponse[]> {
    const response = await axiosConfig.get(`/menu/my/${page}/${count}`);
    return response.data;
}

export async function createRestaurantMenu(menuData: MenuData){
    const response = await axiosConfig.post('/menu/create', menuData);
    return response.data;
}

export async function updateRestaurantMenu(id: string, menuData: MenuData){
    const response = await axiosConfig.put(`/menu/${id}/update`, menuData);
    return response.data;
}

export async function deleteRestaurantMenu(id: string) {

    const response = await axiosConfig.delete('/menu/delete', { data: { id, many: false } })
    return response.data;
}