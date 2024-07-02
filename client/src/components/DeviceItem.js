import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {PRODUCT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {addBasketProduct, checkAllBasket} from "../http/basketAPI";
import basket from '../img/image (3) 1.png';
import basket_img from "../img/image (3) 1.png";

import gal from '../img/icons8-галочка-64.png'
import {jwtDecode} from "jwt-decode";
import {Context} from '../index'
import Modal from "react-bootstrap/Modal";
import {toJS} from "mobx";
const DeviceItem = ({device}) => {
    const {user, product} = useContext(Context)
    const history = useNavigate()
    const user_token = localStorage.getItem('token')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const addProduct = (id)=>{
        if(user.isAuth) {
            addBasketProduct(id, user_token).then(e => {})
        }
        else{
            handleShow()
        }
    }

    let IDS = []

    const [BOOL, setBOOL] = useState(false)
    const addStyle =(e)=>{
        if(user.isAuth) {
            e.target.style.backgroundColor = '#0c0c0c'
            e.target.style.backgroundImage = 'url("' + gal + '")'
            e.target.style.backgroundPosition = 'center'
            e.currentTarget.classList.add('disabled')
        }
    }

    useEffect(()=>{
        if(user.isAuth) {
            checkAllBasket(user_token).then(e => {
                //console.log(e)
                e.map(a => {
                    IDS.push(a.productId)
                    //console.log(IDS)
                })
            }).then(() => {
                setBOOL(IDS.includes(device.id))
            })
        }
    },[])

    return (
        <div className="prod_item">
            <div className='ProdCart'>
                <img onClick={()=> {
                    history(PRODUCT_ROUTE+'/'+device.id)
                    product.setSearchBool(false)
                }} className='prodImg' src={process.env.REACT_APP_BASE_URL+ device.img}/>
                <div className="preview">

                    <div style={{width:'100%'}} className="lft_cart">
                        <h1>{device.name}</h1>

                    </div>
                    <div style={{width:'100%'}} className="but">
                        <p>{device.price+'₽'}</p>
                        {!BOOL ?
                            <Button
                                className='basket_add_but'
                                onClick={(e)=>
                                {
                                    addProduct(device.id)
                                    addStyle(e)
                                }}
                                style={{backgroundColor:'rgb(12 12 12)',
                                    borderColor:'rgb(12 12 12)',
                                    height:'100%'}}
                            >

                            </Button>
                            :
                            <div className='already' style={{
                                width:'20%',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                borderRadius:'30px',
                            }}>
                                {/*<p style={{fontSize:'18px', color:'white', margin:'0'}}>Товар в корзине</p>*/}
                                <img style={{width:'35px'}} src={gal} alt=""/>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Modal
                style={{color: 'white', marginTop:'160px'}}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='my-modal'
            >
                <Modal.Header style={{backgroundColor:'#090b0c'}} closeButton>

                </Modal.Header>
                <Modal.Body className='abv'>
                    <p className='modal_p'>Сначала вам необходимо авторизоваться</p>
                </Modal.Body>
                <Modal.Footer style={{border: 'black', height: '155px'}} className='abv'>
                    <Button style={{height:'50px', width:'50%'}} className='my-button' variant="primary"
                            onClick={()=>{
                                history(REGISTRATION_ROUTE)
                            }}>
                        Авторизоваться
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeviceItem;