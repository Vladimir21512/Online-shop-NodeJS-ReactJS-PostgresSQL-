import React, {useContext, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button, Form, ListGroup} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPI";
import {Context} from "../../index";
import Dropdown from "react-bootstrap/Dropdown";

const FilterModal = ({show, onHide}) => {
    const {product} = useContext(Context)
    return (
        <div >

            <Modal
                id="filt_mod"
                show={show}
                onHide={onHide}
            >
                <Modal.Header style={{borderBottom:'none'}} className='abv_1' closeButton>
                    <Modal.Title style={{fontSize:'50px'}}>Фильтры</Modal.Title>
                </Modal.Header>

                <Modal.Body className='abv_1'>
                    <h1>Размеры</h1>
                    <ListGroup style={{marginBottom:'5%'}}>
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
                </Modal.Body >

                <Modal.Body className='abv_1'>
                    <h1>Категории</h1>
                    <ListGroup style={{marginBottom:'5%'}}>
                        <ListGroup.Item className='liBar' active={product.SelectedCategory==[]} onClick={()=> product.setSelectedCategory([])}>Все</ListGroup.Item>
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
                </Modal.Body>

                <Modal.Body className='abv_1'>
                    <h1>Бренды</h1>
                    <ListGroup style={{marginBottom:'5%'}}>
                        <ListGroup.Item className='liBar' active={product.selectedBrand==[]} onClick={()=> product.setSelectedBrand([])}>Все</ListGroup.Item>
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
                </Modal.Body>

                <Modal.Body className='abv_1'>
                    <h1 >Материал</h1>
                    <ListGroup style={{marginBottom:'5%', border:'1px solid black'}}>
                        <ListGroup.Item className='liBar' active={product.SelectedMaterial==[]} onClick={()=> product.setSelectedMaterial([])}>Все</ListGroup.Item>
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
                </Modal.Body>

                <Modal.Body className='abv_1'>
                    <div style={{height:'200px'}}>
                        <h1>Цена</h1>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Сортировка
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>product.setOrder('up')}>По возрастанию</Dropdown.Item>
                                <Dropdown.Item onClick={()=>product.setOrder('down')}>По убыванию</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Modal.Body>

            </Modal>

        </div>
    );
};

export default FilterModal;