import React, {useState} from 'react';
import logo from '../img/OG.png';
import tgLogo from '../img/telegram-svgrepo-com (2).svg'
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import avito from '../img/avito.svg'
import vk from '../img/vk.svg'
import {DOSTAVKA_ROUTE, MAGAZIN_ROUTE, OPLATA_1_ROUTE, OPLATA_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import money from '../img/pay.png'
const FootBar = () => {
    const [show, setShow] = useState(false);
    const history = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='FootBar'>
            <div style={{marginTop:'0'}} className="container">
            <div style={{height:'auto'}} className='footbar_div'>

                <div className="relatives">
                    {/*<img style={{height:'110px'}} className='foot_log' src={logo} alt=""/>*/}
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'30px'}} className="social">
                        <a href="https://t.me/AscendingMarketFOREVER">
                            <img style={{width:'50px'}} src={tgLogo} alt=""/>
                        </a>
                        <a href="https://www.avito.ru/user/a3f5f661b5c9238a4bbc4684870711c9/profile?src=sharing">
                            <img style={{width:'147px'}} src={avito} alt=""/>
                        </a>
                        <a href="https://vk.com/ascendingmarketforever">
                            <img style={{width:'50px'}} src={vk} alt=""/>
                        </a>
                    </div>
                    <div style={{fontSize:'20px', color:'white',display:'flex', alignItems:'center', justifyContent:'center', marginTop:'30px'}} className="supports">
                        <ul>
                            <li style={{cursor:'pointer'}} onClick={handleShow}>
                                Поддержка
                            </li>
                            <Modal style={{marginTop:'160px'}} show={show} onHide={handleClose}>
                                <Modal.Header className='abv' closeButton>
                                    <Modal.Title>Поддержка</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='abv'>По техническим вопросам пишите на почту: <b style={{fontSize:'25px'}}>scndngspprt@gmail.com</b> </Modal.Body>
                                <Modal.Footer className='abv'>
                                    <Button  style={{marginLeft:'auto', marginRight:'auto', width:'185px'}} variant="primary" onClick={handleClose}>
                                        Ок
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </ul>
                    </div>

                </div>


            </div>
            </div>
            <div style={{ marginTop:'50px', marginBottom:'50px'}} className="container">
                <div className="foot_info">
                    <div className='foot_elem' style={{width:'100%'}}>
                    <img style={{height:'93px'}} className='foot_log' src={logo} alt=""/>
                        <p style={{marginTop:'7px'}}>2023-2024 © ASCENDINGMARKET</p>
                        <p style={{marginTop:'7px'}}>Телеграм: @manager_AscendingMarket</p>
                        <p style={{marginTop:'7px'}}>scndngspprt@gmail.com</p>
                    </div>

                    <div id='spec_foot' className='foot_elem' style={{width:'100%'}}>
                        <h1 style={{height:'93px', display:'flex', alignItems:'center',fontSize:'24px'}}>Помощь покупателю</h1>
                        <ul>
                            <li onClick={()=> {
                                history(MAGAZIN_ROUTE)
                                window.location.reload()
                            }} style={{marginTop:'7px', cursor:'pointer'}}>О магазине</li>
                            <li onClick={()=> {
                                history(DOSTAVKA_ROUTE)
                                window.location.reload()
                            }} style={{marginTop:'7px', cursor:'pointer'}}>Доставка</li>
                            <li onClick={()=> {
                                history(OPLATA_1_ROUTE)
                                window.location.reload()
                            }} style={{marginTop:'7px', cursor:'pointer'}}>Оплата</li>
                            <li onClick={()=> {
                                history(OPLATA_ROUTE)
                                window.location.reload()
                            }} style={{marginTop:'7px', cursor:'pointer'}}>Обмен и возврат</li>
                        </ul>
                    </div>
                    <div className='foot_elem' style={{width:'100%', alignItems:'flex-start', justifyContent:'flex-end'}}>
                        <img src={money} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FootBar;