import React, {useState} from 'react';
import {PRODUCT_ROUTE} from "../utils/consts";
import {useNavigate} from 'react-router-dom'

const OrderElement = ({e, brands, categories, sizes, materials}) => {


    const history = useNavigate()

    const brandName = brands.find(a=> a.id==e.brandId).name
    const matName = materials.find(a=> a.id==e.materialId).name
    const sizedName = sizes.find(a=> a.id==e.sizeId).name
    const catName = categories.find(a=> a.id==e.categoryId).name

    let user_token = localStorage.getItem('token')

    return(
            <div className='ord_prod'>
                <div style={{display: 'flex', cursor:'pointer'}} className="ord_img">
                    <img style={{cursor:'pointer'}} className='ord_im' onClick={() => {
                        history(PRODUCT_ROUTE + '/' + e.id)
                    }}
                         src={process.env.REACT_APP_BASE_URL + e.img} alt=""/>
                </div>
                <div className="ord_charact">
                    <h1 style={{width: '100%'}}>{e.name}</h1>
                    <div style={{width: '100%'}} className="ord_char">

                    </div>
                </div>
                <div className="ord_right_bar">

                    <p style={{float: 'right', width: 'auto', fontSize: '32px', color:'black'}}>{e.price + "₽"}</p>
                </div>
            </div>

    )

};

export default OrderElement;