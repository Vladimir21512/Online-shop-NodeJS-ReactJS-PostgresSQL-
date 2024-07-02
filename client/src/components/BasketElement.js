import React, {useState} from 'react';
import {PRODUCT_ROUTE} from "../utils/consts";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {deleteBasketProduct} from "../http/basketAPI";
import Modal from 'react-bootstrap/Modal';
import circle from '../img/checkbox-circle-svgrepo-com.svg'
import {jwtDecode} from "jwt-decode";
import {fetchOrder} from "../http/orderAPI";

import cross from '../img/delete.svg'

const BasketElement = ({e}) => {
    const history = useNavigate()
    const deleteProd= (id)=>{
        deleteBasketProduct({ID:id}).then((e)=>{
        })
    }


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    let user_token = localStorage.getItem('token')

    return(
        <div key={e.id} className="line">
                    <div className='bask_prod'>
                        <div style={{display: 'flex'}} className="bask_img">
                            {/*<img style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}*/}
                            {/*     src={process.env.REACT_APP_BASE_URL + e.img} alt=""/>*/}
                            <img id="b_img" onClick={() => {
                                history(PRODUCT_ROUTE + '/' + e.id)
                            }} src={process.env.REACT_APP_BASE_URL + e.img} alt=""/>
                        </div>
                        <div className="charact">
                            <h1 style={{width: '100%'}}>{e.name}</h1>
                            {/*<div style={{width: '100%', marginTop: '10%'}} className="char">*/}
                            {/*    <p>{'Бренд:' + brandName}</p>*/}
                            {/*    <p>{'Материал:' + matName}</p>*/}
                            {/*    <p>{'Размер:' + sizedName}</p>*/}
                            {/*    <p>{'Категория:' + catName}</p>*/}
                            {/*</div>*/}
                        </div>
                        <div className="right_bar">

                            <p id="prce" class='summary' style={{float: 'right', width: 'auto'}}>{e.price + "₽"}</p>
                        </div>
                        <div style={{width:'60px'}} className="btn_bar">
                        <Button style={{borderRadius:'50%', backgroundColor:'#ffffff00', width:'60px', height:'60px'}} className='del_bask'
                                onClick={() => {
                                    handleShow()
                                    deleteProd(e.del_id)
                                }}
                        >
                            <img style={{width:'40px'}} src={cross} alt=""/>
                        </Button>
                        </div>
                    </div>





                    <Modal
                        style={{color: 'black', marginTop: '100px'}}
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        className='my-modal'
                    >

                        <Modal.Body className='abv'
                                    style={{
                                        borderTopLeftRadius:'20px',
                                        borderTopRightRadius:'20px',
                                        display:'flex',
                                        flexDirection:'column',
                                        height: '220px',
                                        textAlign: 'center',
                                        fontSize: '30px',
                                        paddingTop: '80px',
                                        zIndex:'100000000000000000'
                                    }}>
                            Товар удалён из корзины
                            <img src={circle} style={{height: '100px'}} alt=""/>
                        </Modal.Body>
                        <Modal.Footer style={{border: 'black', height: '155px'}} className='abv'>
                            <Button className='my-button' variant="primary"
                                    onClick={()=>{
                                        handleClose()
                                        window.location.reload();
                                    }}>
                                Ок
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
    )

};

export default BasketElement;