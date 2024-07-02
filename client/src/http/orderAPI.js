import {$authHost, $host} from '../http/index';
import {jwtDecode} from 'jwt-decode'
export const fetchOrder = async(body)=>{
    const {data} = await $host.post('api/order', body)
    return (data)
}
export const fetchUserOrder = async(token)=>{
    const {data} = await $host.get('api/order', { headers: {"Authorization" : `Bearer ${token}`} })
    return (data)
}
export const checkOne = async(id)=>{
    const {data} = await $host.get('api/order/'+id)
    return (data)
}