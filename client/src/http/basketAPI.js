import {$authHost, $host} from '../http/index';
import {jwtDecode} from 'jwt-decode'

export const addBasketProduct = async (id, token)=>{
    const {data} = await $authHost.post('/api/product/'+id+'/add')
    return data
}

export const deleteBasketProduct = async (body)=>{
    const {data} = await $authHost.post('/api/basket/del', body)
    return data
}
export const fetchBasketProduct = async(token)=>{
    const {data} = await $authHost.get('api/basket')
    return data
}

export const checkBasket = async(id, token)=>{
    const {data} = await $authHost.get('api/basket/checkProduct/'+id, token)
    return data
}

export const checkAllBasket = async(token)=>{
    const {data} = await $authHost.get('api/basket/checkOneProduct', token)
    return data
}