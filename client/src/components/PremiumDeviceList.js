import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import PremiumDeviceItem from "./PremiumDeviceItem";
import {toJS} from "mobx";

const PremiumDeviceList = () => {
    const {product} = useContext(Context)

        return (
            <div className='ProdViewPremium row-cols-2'>
                {product.premiumProducts.map((prod) => {
                    return (
                        <PremiumDeviceItem key={prod.id} device={prod}/>
                    )
                })}
            </div>
        );

};

export default PremiumDeviceList;