import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Dropdown from 'react-bootstrap/Dropdown';
import arrow from "../img/arrow-up-svgrepo-com.svg";
import {ListGroup} from "react-bootstrap";

const SizeBar = observer(() => {
    const {product} = useContext(Context)
    const showList = ()=>{
        if(document.getElementById('riceList').style.height == '0px') {
            document.getElementById('riceList').style.height = '140px'
            document.getElementById('rice_arr').style.rotate='0deg'
        }
        else{
            document.getElementById('riceList').style.height = '0px'
            document.getElementById('rice_arr').style.rotate='180deg'
        }
    }
    return (
        <div>
            <div onClick={()=> showList()} className="filt_div">
                <h1 style={{height:'100%', width:'50%'}} onClick={()=> showList()}>Цена</h1>
                <img id='rice_arr' style={{width:'50px', rotate:'180deg'}} src={arrow} alt=""/>
            </div>
            <ListGroup id="riceList" style={{height:'0px'}}>
                <ListGroup.Item active={product.Order=='up'} style={{width:'70%'}} className='liBar' onClick={()=> product.setOrder('up')} >По возрастанию</ListGroup.Item>
                <ListGroup.Item active={product.Order=='down'} style={{width:'70%'}} className='liBar' onClick={()=> product.setOrder('down')} >По Убыванию</ListGroup.Item>
            </ListGroup>
        </div>
    );
});

export default SizeBar;