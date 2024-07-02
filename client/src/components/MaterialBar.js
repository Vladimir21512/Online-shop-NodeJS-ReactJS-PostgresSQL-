import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import arrow from '../img/arrow-up-svgrepo-com.svg'

const MaterialBar = observer(() => {
    const {product} = useContext(Context)
    const showList = ()=>{
        if(document.getElementById('MatList').style.height == '0px') {
            document.getElementById('MatList').style.height = '280px'
            document.getElementById('mat_arr').style.rotate='0deg'
        }
        else{
            document.getElementById('MatList').style.height = '0px'
            document.getElementById('mat_arr').style.rotate='180deg'
        }
    }

    return (
        <div>
            <div onClick={()=> showList()} className="filt_div">
                <h1 style={{height:'100%', width:'50%'}} onClick={()=> showList()}>Сезон</h1>
                <img id='mat_arr' style={{width:'50px', rotate:'180deg'}} src={arrow} alt=""/>
            </div>
            <ListGroup id="MatList" style={{height:'0px'}}>
                <ListGroup.Item className='liBar' onClick={()=> product.setSelectedMaterial([])} >Все</ListGroup.Item>
                {product.materials.map((mat)=>{
                    return(

                        <ListGroup.Item
                            className='liBar'
                            key={mat.id}
                            active={mat.id === product.SelectedMaterial.id}
                            onClick={()=> product.setSelectedMaterial(mat)}
                        >
                            {mat.name}
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
});

export default MaterialBar;