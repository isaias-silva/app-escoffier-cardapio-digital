import { MenuData, MenuResponse } from "../../../interfaces/menu.interface";
import { BasicResponses } from "../../../interfaces/response.interfaces";
import axiosConfig from "../axiosConfig";
import { getToken } from "./restaurant.service";



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
export async function getAllRestaurantMenus(page: number, count: number, id?: string): Promise<MenuResponse[]> {

    if (!id) {
        return []
    }
    const response = await axiosConfig.get(`/menu/get/${id}/${page}/${count}`);
    return response.data;
}

export async function createRestaurantMenu(menuData: MenuData) {
    const token = getToken()
    const response = await axiosConfig.post('/menu/create', menuData, { headers: { 'Authorization': `Bearer ${token}` } });
    if(response.status==201){

        return response.data;
    }else{
        return response
    }
}

export async function updateRestaurantMenu(id: string, menuData: MenuData) {
    const token = getToken()
    const response = await axiosConfig.put(`/menu/${id}/update`, menuData, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export async function deleteRestaurantMenu(id: string) {
    const token = getToken()
    const response = await axiosConfig.delete('/menu/delete', { data: { id, many: false }, headers: { 'Authorization': `Bearer ${token}` } })
    return response.data;
}