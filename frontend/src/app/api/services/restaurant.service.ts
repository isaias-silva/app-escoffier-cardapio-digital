
import { setCookie ,getCookie,deleteCookie} from "cookies-next";
import { AuthResponse, BasicResponses } from "../../../interfaces/response.interfaces";
import { Restaurant, RestaurantUpdate } from "../../../interfaces/restaurant.interface";
import axiosConfig from "../axiosConfig";


async function login(email: string, password: string) {

    const res = await axiosConfig.post<AuthResponse>('/restaurant/login', { email, password })

    if (res.data && res.status == 201) {

        setCookie('jwt-auth', res.data.token)
    }
    return res
}
async function register(name: string, email: string, password: string) {

    const res = await axiosConfig.post<AuthResponse>('/restaurant/register', { name, email, password })

    if (res.data && res.status == 201) {

        setCookie('jwt-auth', res.data.token)
    }
    return res
}

async function logout() {
    deleteCookie('jwt-auth')
}

function getToken(): string | undefined {
    return getCookie('jwt-auth')
}
async function updateRestaurant(updateDto: RestaurantUpdate) {
    const token = getToken()
    if (!token) {
        return
    }
    const res = await axiosConfig.put<BasicResponses>('/restaurant/update', updateDto, { headers: { 'Authorization': `Bearer ${token}` } })
    return res
}
async function updateProfile(data: File) {
    const token = getToken()
    if (!token) {
        return
    }
    const formData = new FormData();

    formData.append('file', data);

    const res = await axiosConfig.put<Restaurant>('/restaurant/update/profile', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return res
}

async function updatePasswordForgotten(new_password: string, email: string) {
    
    const res = await axiosConfig.put<BasicResponses>('/restaurant/update/password/forgotten', { email, new_password } )
    return res
}
async function confirmCode(code: string, email: string) {
    
    const res = await axiosConfig.put<BasicResponses>('/restaurant/confirm/code', { email, code })
    return res
}
async function getMyRestaurant() {
    const token = getToken()
    if (!token) {
        return
    }
    const res = await axiosConfig.get<Restaurant>('/restaurant/', { headers: { 'Authorization': `Bearer ${token}` } })
    return res
}
async function getRestaurant(id: string) {
    const token = getToken()
    if (!token) {
        return
    }
    const res = await axiosConfig.get<Restaurant>(`/restaurant/${id}`)

    return res
}


export {
    login,
    register,
    logout,
    getToken,
    getRestaurant,
    getMyRestaurant,
    updateRestaurant,
    updateProfile,
    updatePasswordForgotten,
    confirmCode
}