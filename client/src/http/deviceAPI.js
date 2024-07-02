import {$authHost, $host} from '../http/index';
import {jwtDecode} from 'jwt-decode'

export const createCategory = async(category)=>{
    const {data} = await $authHost.post('api/categories', category)
    return data
}

export const fetchCategory = async()=>{
    const {data} = await $host.get('api/categories')
    return data
}

export const createBrand = async(brand)=>{
    // const {data} = await $authHost.post('api/brand', brand)
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrand = async()=>{
    // const {data} = await $host.get('api/brand')
    const {data} = await $host.get('api/brand')
    return data
}


export const createMaterial = async(mat)=>{
    const {data} = await $authHost.post('api/material', mat)
    return data
}

export const fetchMaterial= async()=>{
    const {data} = await $host.get('api/material')
    return data
}

export const createSize = async(size)=>{
    const {data} = await $authHost.post('api/size', size)
    return data
}

export const fetchSize = async()=>{
    const {data} = await $host.get('api/size')
    return data
}

export const fetchColors = async()=>{
    const {data} = await $host.get('api/color')
    return data
}
export const createColors = async(formdata)=>{
    const {data} = await $host.post('api/color', formdata)
    return data
}

export const createProduct = async(product)=>{
    console.log(product)
    for (var pair of product.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
        if(pair[1]=='info_1'){
            for (var key in pair[1]) {
                if (pair[1].hasOwnProperty(key)) {
                    console.log(key + " -> " + pair[1][key]);
                }
            }
        }
    }
    const data = await $authHost.post('api/product', product).catch((e)=>console.log(e))
    return data
}

export const fetchProduct = async(categoryId, brandId, materialId, order, limit, page, start, finish)=>{
    const {data} = await $host.get('api/product', {params:{
            categoryId, brandId, materialId, order, limit,page, start, finish
        }})
    return data
}
export const fetchAll = async()=>{
    const {data} = await $host.get('api/product/all')
    return data
}

export const fetchPremiumProduct = async()=>{
    const {data} = await $host.get('api/product/premium')
    return data
}

export const fetchOneProduct = async(id)=>{
    const {data} = await $host.get('api/product/'+id)
    return data
}
export const fetchOneProductInfo = async(id)=>{
    const {data} = await $host.get('api/product/info/'+id)
    return data
}

export const fetchCategoryResult= async(category,sexId)=>{
    const {data} = await $host.get('api/product/category_category/'+category+'/'+sexId)
    return data
}

export const fetchBrandResult= async(category,sexId)=>{
    const {data} = await $host.get('api/product/category_brand/'+category+'/'+sexId)
    return data
}
export const fetchSizeResult= async(category,sexId)=>{
    const {data} = await $host.get('api/product/category_size/'+category+'/'+sexId)
    return data
}
export const fetchSeasonResult= async(category,sexId)=>{
    const {data} = await $host.get('api/product/category_season/'+category+'/'+sexId)
    return data
}



export const createComm = async(token, body, id, idd)=>{
    const {data} = await $authHost.post('api/product/'+ id + '/addcomm', body,{ headers: {"Authorization" : `Bearer ${token}`} })
    return data
}

export const fetchComm = async(id)=>{
    const {data} = await $host.get('api/product/'+ id + '/getcomm')
    return data
}

export const deleteComm = async(id, token)=>{
    const {data} = await $host.post('api/product/'+ id + '/delcomm',id,{ headers: {"Authorization" : `Bearer ${token}`} })
    return data
}

export const ban = async(body, token)=>{
    const {data} = await $authHost.post('api/product/banUser', body, { headers: {"Authorization" : `Bearer ${token}`} })
}
