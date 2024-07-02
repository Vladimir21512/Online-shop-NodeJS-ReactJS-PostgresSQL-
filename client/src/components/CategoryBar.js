import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import arrow from '../img/arrow-up-svgrepo-com.svg'

const CategoryBar = observer(() => {
    const {product} = useContext(Context)
    const showList = ()=>{
        if(document.getElementById('CatList').style.height == '0px') {
            document.getElementById('CatList').style.height = '280px'
            document.getElementById('cat_arr').style.rotate='0deg'
        }
        else{
            document.getElementById('CatList').style.height = '0px'
            document.getElementById('cat_arr').style.rotate='180deg'
        }
    }
    return (
        <div>
            <div onClick={()=> showList()} className="filt_div">
                <h1 style={{height:'100%', width:'50%'}} >Категории</h1>
                <img id='cat_arr' style={{width:'50px', rotate:'180deg'}} src={arrow} alt=""/>
            </div>
            <ListGroup id="CatList" style={{height:'0px'}}>
                <ListGroup.Item className='liBar' onClick={()=> product.setSelectedCategory([])} >Все</ListGroup.Item>
                {product.categories.map((category)=>{

                    return(

                       <ListGroup.Item
                           className='liBar'
                           key={category.id}
                           active={category.id === product.SelectedCategory.id}
                           onClick={()=> product.setSelectedCategory(category)}
                       >
                            {category.name}
                        </ListGroup.Item>
                    )}
                )}

            </ListGroup>
        </div>
    );
});

export default CategoryBar;