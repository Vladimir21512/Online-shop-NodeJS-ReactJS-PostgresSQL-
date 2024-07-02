import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import arrow from '../img/arrow-up-svgrepo-com.svg'

const SizeBar = observer(() => {
    const {product} = useContext(Context)
    const showList = ()=>{
        if(document.getElementById('SizeList').style.height == '0px') {
            document.getElementById('SizeList').style.height = '280px'
            document.getElementById('size_arr').style.rotate='0deg'
        }
        else{
            document.getElementById('SizeList').style.height = '0px'
            document.getElementById('size_arr').style.rotate='180deg'
        }
    }
    return (
        <div>
            <div onClick={()=> showList()} className="filt_div">
                <h1 style={{height:'100%', width:'50%'}} >Размер</h1>
                <img id='size_arr' style={{width:'50px', rotate:'180deg'}} src={arrow} alt=""/>
            </div>
            <ListGroup id="SizeList" style={{height:'0px'}}>
                <ListGroup.Item className='liBar' active={product.SelectedSize==[]} onClick={()=> product.setSelectedSize([])}>Все</ListGroup.Item>
                {product.sizes.map((size)=>{
                    return(

                        <ListGroup.Item
                            active={size.id === product.SelectedSize.id}
                            onClick={()=> product.setSelectedSize(size)}
                            className='liBar'
                            key={size.id}
                        >

                            {size.name}
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
});

export default SizeBar;