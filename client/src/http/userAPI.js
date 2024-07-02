import {$authHost, $host} from '../http/index';
import {jwtDecode} from 'jwt-decode'

export const registration = async(body)=>{
    const {data} = await $host.post('api/user/registration', body)
    return jwtDecode(data.token)
}

export const login = async(email, password)=>{
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async()=>{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const checkBan = async(id, token)=>{
    const {data} = await $authHost.get('api/user/checkBan/'+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    return data
}

export const newPass = async(email)=>{
    const {data} = await $authHost.post('api/user/pass',email)
    return data
}

export const newLink = async(email)=>{
    const {data} = await $authHost.post('api/user/newLink', {email})
    return data
}
