import { CreateDishe, DeleteDishe, Dishe, UpdateDishe } from "../../../interfaces/dishe.interface";
import { BasicResponses, IdResponses } from "../../../interfaces/response.interfaces";
import axiosConfig from "../axiosConfig";
import { getToken } from "./restaurant.service";



export async function createDishe(createDisheDto: CreateDishe) {
    const token = getToken()
    const response = await axiosConfig.post<IdResponses>('/dishe/create', createDisheDto,{headers: { 'Authorization': `Bearer ${token}` }});
    return response;
}

export async function getDishe(id: string) {
    const response = await axiosConfig.get<Dishe>(`/dishe/${id}`);
    return response.data;
}

export async function updateDishe(id: string, updateDisheDto: UpdateDishe) {
    const token = getToken()
    const response = await axiosConfig.put<BasicResponses>(`/dishe/update/${id}`, updateDisheDto,{headers: { 'Authorization': `Bearer ${token}` }});
    return response;
}

export async function updateDisheProfile(id: string, file: File): Promise<BasicResponses> {
    const token = getToken()
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosConfig.put(`/dishe/update/${id}/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
         'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
}

export async function deleteDishe(deleteDisheDto: DeleteDishe): Promise<BasicResponses> {
    const token = getToken()
    
    const response = await axiosConfig.delete(`/dishe/delete/`, { data: deleteDisheDto ,headers: { 'Authorization': `Bearer ${token}` }});
    return response.data;
}