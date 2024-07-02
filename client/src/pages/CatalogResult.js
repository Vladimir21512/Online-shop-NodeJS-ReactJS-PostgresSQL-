import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {fetchCategoryResult} from "../http/deviceAPI";
import {Context} from "../index";
import DeviceItem from "../components/DeviceItem";
import {observe, toJS} from "mobx";
import {observer} from "mobx-react-lite";

const CatalogResult = observer(() => {
    const {product} = useContext(Context)
    const {category, par, sex} = useParams()
    let sexString
    if(sex==1){
        sexString='Мужчины'
    }
    else if(sex==2){
        sexString='Женщины'
    }
    else{
        sexString='Унисекс'
    }

    return (
        <div style={{marginTop:'100px'}}>
            <pre><h1 style={{display:'flex'}}>{sexString}  /  {par}  /  <p style={{color:'gray', width:'100px'}}>{category}</p></h1></pre>
            <div className="ProdViewResult">
                {product.CategoryResult.map(e=>{
                    return(
                        <DeviceItem key={e.id} device={e}></DeviceItem>
                    )
                })
                }
            </div>
            <div style={{height:'200px'}}></div>
        </div>
    );
});

export default CatalogResult;