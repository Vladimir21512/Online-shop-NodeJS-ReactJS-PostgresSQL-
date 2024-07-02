import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import DeviceItem from "./DeviceItem";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const DeviceList = observer((FilterData) => {
    const {product} = useContext(Context)

    //console.log(toJS(product.products))
    return (
        <div className='ProdView row-cols-2'>
            {product.products.map((prod)=>{
                return (
                    <DeviceItem key={prod.id} device={prod}/>
                )
            })}
            <div></div>
        </div>
    );
});

export default DeviceList;