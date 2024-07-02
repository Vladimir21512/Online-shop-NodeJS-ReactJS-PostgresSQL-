import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import arrow from '../img/arrow-up-svgrepo-com.svg'

const BrandBar = observer(() => {
    const {product} = useContext(Context)
    const showList = ()=>{
        if(document.getElementById('BrandList').style.height == '0px'){
            document.getElementById('BrandList').style.height = '280px'
            document.getElementById('brand_arr').style.rotate='0deg'
        }
        else{
            document.getElementById('BrandList').style.height = '0px'
            document.getElementById('brand_arr').style.rotate='180deg'
        }
    }
    return (
        <div>
            <div onClick={()=> showList()} className="filt_div">
                <h1 style={{height:'100%', width:'50%'}} >Бренды</h1>
                <img id="brand_arr" style={{width:'50px', rotate:'180deg'}} src={arrow} alt=""/>
            </div>
            <ListGroup id="BrandList" style={{height:'0px'}}>
                <ListGroup.Item className='liBar' onClick={()=> product.setSelectedBrand([])} >Все</ListGroup.Item>
                {product.brands.map((brand)=>{
                    return(

                        <ListGroup.Item
                            className='liBar'

                            key={brand.id}
                            active={brand.id === product.selectedBrand.id}
                            onClick={()=> product.setSelectedBrand(brand)}
                        >
                            {brand.name}
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
});

export default BrandBar;