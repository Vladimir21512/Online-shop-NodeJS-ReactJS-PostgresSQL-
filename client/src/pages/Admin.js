import React, {useContext, useState} from 'react';
import {Context} from "../index";
import CreateBrand from "../components/modal/CreateBrand";
import CreateMaterial from "../components/modal/CreateMaterial";
import CreateCategory from "../components/modal/CreateCategory";
import CreateSize from "../components/modal/CreateSize";
import CreateProduct from "../components/modal/CreateProduct";
import CreateColor from "../components/modal/CreateColor";
import {observer} from "mobx-react-lite";

const Admin = () => {
    const [brandVisible, SetBrandVisible] = useState(false)
    const [materialVisible, SetMaterialVisible] = useState(false)
    const [categoryVisible, SetCategoryVisible] = useState(false)
    const [sizeVisible, SetSizeVisible] = useState(false)
    const [colorVisible, SetColorVisible] = useState(false)
    const [productVisible, SetProductVisible] = useState(false)

    return (
        <div className='Column'>
            <button className="admin_nut" onClick={()=> SetSizeVisible(true)}>Добавить размер</button>
            <button className="admin_nut" onClick={()=> SetMaterialVisible(true)}>Добавить время года</button>
            <button className="admin_nut" onClick={()=> SetCategoryVisible(true)}>Добавить категорию</button>
            <button className="admin_nut" onClick={()=> SetBrandVisible(true)}>Добавить бренд</button>
            <button className="admin_nut" onClick={()=> SetColorVisible(true)}>Добавить цвет</button>
            <button className="admin_nut" onClick={()=> SetProductVisible(true)}>Добавить товар</button>


                 <CreateBrand show={brandVisible} onHide={()=> SetBrandVisible(false)}/>
                 <CreateMaterial show={materialVisible} onHide={()=> SetMaterialVisible(false)}/>
                 <CreateCategory show={categoryVisible} onHide={()=> SetCategoryVisible(false)}/>
                 <CreateSize show={sizeVisible} onHide={()=> SetSizeVisible(false)}/>
                 <CreateProduct show={productVisible} onHide={()=> {SetProductVisible(false)}}/>
                 <CreateColor show={colorVisible} onHide={()=> {SetColorVisible(false)}}/>
            </div>

    );
};

export default Admin;