import React, {useContext, useEffect, useState} from 'react';
import {
    ban,
    createComm, deleteComm, deleteUsersComm,
    fetchBrand,
    fetchCategory,
    fetchComm,
    fetchMaterial,
    fetchOneProduct, fetchOneProductInfo,
    fetchSize
} from "../http/deviceAPI";
import arr from '../img/Vector.png';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import {Context} from "../index";
import {addBasketProduct, checkBasket, fetchBasketProduct} from "../http/basketAPI";
import gal from "../img/icons8-галочка-48.png";
import Modal from "react-bootstrap/Modal";
import circle from "../img/checkbox-circle-svgrepo-com.svg";
import {Button, Form} from "react-bootstrap";
import {checkOne, fetchOrder} from "../http/orderAPI";
import {CONFIRM_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {BAD_WORDS_LIST} from "../utils/consts";
import {newLink} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const ProductPage = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const [product, setProduct] = useState({info:[]})


    const [sizeName, setSize] = useState()
    const [mat, setMat] = useState()
    const [cat, setCat] = useState()
    const [brand, setBrand] = useState()
    const [info, setInfo] = useState()
    const {id} = useParams()

    const [value, setValue] = useState('')

    const [comms, getComms] = useState()

    const [BOOL, setBool] = useState(true)

    const [checkOrd, SetCheckOrd] = useState(false)

    const [isADMIN, isAdminState] = useState(false)

    let user_token = undefined

    const [default_color, setDefault] = useState(0)

    if(user.isAuth) {
        user_token = localStorage.getItem('token')

    }
    const [render,setRender] = useState()
    useEffect(()=>{
        fetchOneProduct(id).then((data)=> {
            setProduct(data)
            if(user_token) {
                checkBasket(id, user_token).then((e) => {
                    if (e) {
                        setBool(false)
                    }

                })
            }
            fetchBrand().then(item=>{

                const brandName = item.brands
                setBrand(brandName.find(e=> e.id==data.brandId).name )

            })
            fetchCategory().then(cat=> {
                const CAT = cat.categories
                setCat(CAT.find(e=> e.id==data.categoryId).name)
            })
             // fetchSize().then(size=>{
             //     const SIZE = size.sizes
             //     setSize(SIZE.find(e=>e.id==data.sizeId).name)
             // })
            fetchMaterial().then(dat=>{
                const MAT = dat.materials
                setMat(MAT.find(e=> e.id==data.materialId).name)

            })
            fetchOneProductInfo(id).then(e=>{
                setRender(e)
            })
            render[default_color].sizes.split(',')



            fetchComm(id).then(e=> getComms(e)).then(()=>{
                if(user_token!=undefined) {
                    if (jwtDecode(user_token).role = "ADMIN") {
                        isAdminState(true)
                    }
                }
            })
        } ).catch(e=> {

        })
        checkOne(id).then(e=> {
            if(e!=null){
                SetCheckOrd(true)
            }
        })
    },[])

    const addComm = ()=>{

        if(localStorage.getItem('token')) {
            if (jwtDecode(user_token).isActive != false) {
                if (localStorage.getItem('token')) {
                    if (jwtDecode(user_token).isBanned != true) {
                        const reEscape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                        const badWords = BAD_WORDS_LIST
                        const badWordsRE = new RegExp(badWords.map(reEscape).join('|'));

                        const VALUE = value.replace(/\s/g, "").toLowerCase()

                        if (VALUE.match(badWordsRE) != null) {
                            handleShowFilter()
                        } else {
                            if (user.isAuth) {
                                const formData = new FormData()
                                formData.append('desc', value)
                                createComm(user_token, formData, id).then(() => {
                                        setValue('')
                                    }
                                ).then((e) => {
                                    window.location.reload();
                                })
                            } else {
                                handleShowAvt()
                            }
                        }
                    } else {
                        alert('Вы не можете писать комментарии: вас заблокировал администратор')
                    }
                } else {
                    handleShowAvt()
                }
            } else {
                handleShowMail()
            }
        }
        else{
            handleShowAvt()
        }
    }

    const banUser=(userId)=>{
        let formData = new FormData()
        formData.append('userId', userId)
        ban(formData, user_token).then(e=>{

        })
    }

    const addProd = ()=>{
        if(localStorage.getItem('token')) {
            if(jwtDecode(localStorage.getItem('token')).isActive==true) {
                addBasketProduct(id, user_token).then((e) => {
                })
            }
            else{
                handleShowMail()
            }
        }
        else{
            handleShowAvt()
        }
    }

    const addStyle =(e)=>{
        if(user.isAuth) {
            e.target.style.backgroundColor = 'rgba(255,255,255,0)'
            e.target.style.backgroundRepeat = 'no-repeat'
            e.target.style.backgroundPosition = 'center'
            e.currentTarget.classList.add('disabled')
            e.target.style.backgroundSize = '15%'
            e.target.style.border = '1px solid white'
            e.target.style.color='white'
            e.target.innerHTML = 'Добавлен'
        }
        else{
            return
        }
    }


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    }
    const handleNext= () => {
        if (fio==undefined || name == undefined || street==undefined || phone==undefined || city==undefined || otch==undefined || fio.trim()=='' || name.trim()=='' || street.trim()=='' || phone.trim()=='' || city.trim()=='' || otch.trim()==''){
            alert('Вы не можете оставить поля пустыми!')
            setShow(false)
        }
        else {
            setShow(false)
            handleShowAccess()
        }
    }
    const handleShow = () => {
        if(localStorage.getItem('token')) {
            if (jwtDecode(localStorage.getItem('token')).isActive == true) {
                setShow(true)
            } else {
                setShowMail(true)
            }
        }
        else{
            handleShowAvt()
        }
    };

    const [showAvt, setShowAvt] = useState(false);
    const handleCloseAvt = () =>setShowAvt(false)

    const handleShowAvt = () => setShowAvt(true);

    const [showFilter, setShowFilter] = useState(false);
    const handleCloseFilter = () => setShowFilter(false);
    const handleShowFilter = () => setShowFilter(true);

    const [showAccess, setShowAccess] = useState(false);
    const handleCloseAccess = () => setShowAccess(false);
    const handleShowAccess = () => setShowAccess(true);

    const [showThank, setShowThank] = useState(false);
    const handleCloseThank = () => setShowThank(false);
    const handleShowThank = () => setShowThank(true);


    const [showMail, setShowMail] = useState(false);
    const handleCloseMail = () => setShowMail(false);
    const handleShowMail = () => setShowMail(true);

    const delComm=(id)=>{
        deleteComm(id, user_token).then(()=>{
            window.location.reload();
        })
    }

    const [fio, setFi] = useState()
    const [name, setName] = useState()
    const [otch, setOtch] = useState()

    const [phone, setPhone] = useState()
    const [city, setCity] = useState()
    const [street, setStreet] = useState()

    const [size_state, setColorSize] = useState()

    const Order = ()=>{
        if(localStorage.getItem('token')) {
            const FIO = fio + ' ' + name + ' ' + otch

            const formData = new FormData()

            formData.append('userId', jwtDecode(user_token).id)
            formData.append('user_email', jwtDecode(user_token).email)
            formData.append('productId', id)
            formData.append('product_name', product.name)
            formData.append('product_price', product.price)
            formData.append('FIO', FIO)
            formData.append('phone_number', phone)
            formData.append('city', city)
            formData.append('street', street)
            formData.append('size', size_state)
            formData.append('color', render[default_color].color)

            fetchOrder(formData)
        }
        else{
            handleShowAvt()
        }
    }

    const handleSubmit = event => {
        if(localStorage.getItem('token')) {
            event.preventDefault();
            addComm();
        }
        else{
            handleShowAvt()
        }
    };

    const handleSubmit_1 = event => {
        event.preventDefault();
    };
    const changeImg=(e)=>{
        const newImgSrc = e.target.getAttribute('src')
        const mainImg = document.getElementById('main_img')
        mainImg.setAttribute('src', newImgSrc)
        // e.target.style.filter='blur(0px)'

    }
    const mailAccess=()=>{
        newLink(jwtDecode(localStorage.getItem('token')).email).then(e=> {
                history(CONFIRM_ROUTE)
                handleCloseMail()
            }
        )
    }
    const changeColorInfo=(e)=>{
        setDefault(render.indexOf(e))
        setColorSize('')
    }
    const changeColorSize = (e)=>{
        setColorSize(e)
    }
    return (
        <div id='hg' style={{height:'auto'}}>
            <div className="high">
                <div className='ProdPageImg'>
                    {render &&
                        <>
                        {render[default_color].img1 ?
                            <img id='main_img' className='ProdId' src={process.env.REACT_APP_BASE_URL+render[default_color].img1}></img>
                            :
                            <>
                                {render[default_color].img2 ?
                                    <img id='main_img' className='ProdId' src={process.env.REACT_APP_BASE_URL+render[default_color].img2}></img>
                                    :
                                    <>
                                        {render[default_color].img3 ?
                                            <img id='main_img' className='ProdId' src={process.env.REACT_APP_BASE_URL+render[default_color].img3}></img>
                                            :
                                            <>
                                                {render[default_color].img4 ?
                                                    <img id='main_img' className='ProdId' src={process.env.REACT_APP_BASE_URL+render[default_color].img4}></img>
                                                    :
                                                    <>
                                                        {render[default_color].img5 &&
                                                            <img id='main_img' className='ProdId' src={process.env.REACT_APP_BASE_URL+render[default_color].img5}></img>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </>
                        }
                        </>
                    }
                    <div className="dop_img">
                        {render &&
                            <>
                            {render[default_color].img1 &&
                                <img onClick={e=> changeImg(e)} className='dop' src={process.env.REACT_APP_BASE_URL+render[default_color].img1}></img>
                            }
                                {render[default_color].img2 &&
                                    <img onClick={e=> changeImg(e)} className='dop' src={process.env.REACT_APP_BASE_URL+render[default_color].img2}></img>
                                }
                                {render[default_color].img3 &&
                                    <img onClick={e=> changeImg(e)} className='dop' src={process.env.REACT_APP_BASE_URL+render[default_color].img3}></img>
                                }
                                {render[default_color].img4 &&
                                    <img onClick={e=> changeImg(e)} className='dop' src={process.env.REACT_APP_BASE_URL+render[default_color].img4}></img>
                                }
                                {render[default_color].img5 &&
                                    <img onClick={e=> changeImg(e)} className='dop' src={process.env.REACT_APP_BASE_URL+render[default_color].img5}></img>
                                }
                            </>
                        }
                    </div>
                </div>

                <div style={{height:'80%'}} className='RightInfPg'>

                    <h1 className='product_name'>{product.name}</h1>
                    <p className='p_page' style={{fontSize:'35px'}}>{product.price+'₽'}</p>

                    <div style={{height:'auto',borderTop:'1px solid white',borderBottom:'1px solid white', display:'flex', flexDirection:'column'}}>
                        <b style={{fontSize:'25px', marginLeft:'7px'}}>Размер</b>
                        <div>
                        {render  &&
                                <div style={{height:'55px', display:'flex', marginTop:'10px', marginBottom:'5px'}}>
                                    {render[default_color].sizes.split(',').map(e=>{
                                        if(size_state!=e) {
                                            return (
                                                <div onClick={() => changeColorSize(e)} style={{
                                                    height: '45px',
                                                    width: '45px',
                                                    border: '1px solid white',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    cursor:'pointer',
                                                    marginLeft: '7px'
                                                }}>
                                                    <b>{e}</b>
                                                </div>
                                            )
                                        }
                                        else{
                                            return (
                                                <div onClick={() => changeColorSize(e)} style={{
                                                    height: '45px',
                                                    width: '45px',
                                                    border: '1px solid white',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    backgroundColor:'red',
                                                    alignItems: 'center',
                                                    marginLeft: '7px'
                                                }}>
                                                    <b>{e}</b>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>

                        }
                        </div>
                    </div>
                    <div style={{height:'100px',borderTop:'1px solid white',borderBottom:'1px solid white', display:'flex', flexDirection:'column'}}>
                        <b style={{fontSize:'25px', marginLeft:'7px'}}>Цвет</b>
                        <div style={{display:'flex', marginTop:'7px'}}>
                        {render  && render.map(e=> {
                                const hx = e.hex

                            if(render.indexOf(e)==default_color)
                            {
                                return(
                                    <div onClick={() => changeColorInfo(e)} style={{
                                        height: '30px',
                                        width: '30px',
                                        backgroundColor: 'black',
                                        border:'1px solid white',
                                        borderRadius: '50%',
                                        marginLeft: '7px',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}>
                                        <div onClick={() => changeColorInfo(e)} style={{
                                            height: '20px',
                                            width: '20px',
                                            backgroundColor: hx,
                                            borderRadius: '50%',
                                        }}>
                                        </div>
                                    </div>
                                )
                            }
                                else{
                                    return(
                                        <div onClick={() => changeColorInfo(e)} style={{
                                               height: '30px',
                                            width: '30px',
                                            backgroundColor: hx,
                                            borderRadius: '50%',
                                            cursor:'pointer',
                                            marginLeft: '7px'}}>
                                        </div>
                                    )
                            }

                            })
                        }
                        </div>
                    </div>
                    <div className="har">
                        {/*<div style={{borderBottom:'1px solid #626262'}} className="opis">*/}
                        {/*    <p style={{color:'#AFAFAF'}}>{product.description}</p>*/}
                        {/*</div>*/}

                        <div className="btn_page">

                            {!checkOrd ?
                                <>
                                {(size_state == undefined || size_state == '') ?
                                    <button disabled='true'
                                            style={{backgroundColor: 'gray', height: '50px', fontFamily:'\'Oswald\', sans-serif'}}
                                            className='btnDef'><p style={{color: 'white'}}>Оформить заказ</p></button>
                                    :
                                    <button onClick={handleShow}
                                            style={{backgroundColor: 'white', color: 'black', height: '50px'}}
                                            className='btnDef'><p style={{color: 'black', fontFamily:'\'Oswald\', sans-serif'}}>Оформить заказ</p></button>
                                }
                                </>
                                :
                                <button disabled style={{backgroundColor:'white', color:'black', textAlign:'center'}} className='btnDef'>Заказ оформлен</button>

                            }
                            {BOOL ?

                                <button onClick={(e) => {
                                    addProd()
                                    addStyle(e)
                                }} className='btnDef'
                                        style={{backgroundColor:'white', color:'black', height:'50px'}}
                                ><p style={{color:'black', fontFamily:'\'Oswald\', sans-serif'}}>Добавить в корзину</p></button>
                                :
                                <div className="prod_in_bask">
                                    <h1 id='H1' className='product_in_bask' style={{color:'white', fontFamily:'\'Oswald\', sans-serif'}}>Товар в корзине</h1>
                                </div>
                            }
                            <Modal
                                style={{color: 'white', marginTop:'130px'}}
                                show={showFilter}
                                onHide={handleCloseFilter}
                                backdrop="static"
                                keyboard={false}
                                className='my-modal'
                            >
                                <Modal.Header style={{backgroundColor:'#090b0c'}} closeButton>

                                </Modal.Header>
                                <Modal.Body className='abv'>
                                   <p style={{width:'100%', textAlign:'center', color:'black', marginTop:'60px', fontSize:'30px'}}>Недопустимое содержимое комментария</p>
                                </Modal.Body>
                                <Modal.Footer style={{border: 'black', height: '155px'}} className='abv'>
                                    <Button className='my-button' variant="primary"
                                            onClick={()=>{
                                                handleCloseFilter()
                                            }}>
                                        Oк
                                    </Button>
                                </Modal.Footer>
                            </Modal>


                            <Modal
                                style={{color: 'white', marginTop:'130px'}}
                                show={showMail}
                                onHide={handleCloseMail}
                                backdrop="static"
                                keyboard={false}
                                className='my-modal'
                            >
                                <Modal.Header style={{backgroundColor:'#090b0c'}} closeButton>

                                </Modal.Header>
                                <Modal.Body className='abv'>
                                    <p style={{width:'100%', textAlign:'center', color:'black', marginTop:'60px', fontSize:'30px'}}>Сначала вам необходимо подтвердить почту</p>
                                </Modal.Body>
                                <Modal.Footer style={{border: 'black', height: '155px'}} className='abv'>
                                    <Button className='my-button' variant="primary"
                                            onClick={()=>{
                                                handleCloseMail()
                                            }}>
                                        Отмена
                                    </Button>
                                    <Button className='my-button' variant="primary"
                                            onClick={()=>{
                                                mailAccess()
                                            }}>
                                        Подтвердить
                                    </Button>
                                </Modal.Footer>
                            </Modal>


                            <Modal
                                style={{color: 'white', marginTop:'130px'}}
                                show={showThank}
                                onHide={handleCloseThank}
                                backdrop="static"
                                keyboard={false}
                                className='my-modal'
                            >
                                <Modal.Header style={{backgroundColor:'#090b0c'}} closeButton>

                                </Modal.Header>
                                <Modal.Body className='abv'>
                                    <p style={{width:'100%', textAlign:'center', color:'black', marginTop:'60px', fontSize:'30px'}}>Благодарим за оформление заказа!</p>
                                    <p style={{width:'100%', textAlign:'center', color:'black', marginTop:'60px', fontSize:'30px'}}>В ближайшее время с вами свяжется наш менеджер</p>
                                </Modal.Body>
                                <Modal.Footer style={{border: 'black', height: '155px'}} className='abv'>
                                    <Button className='my-button' variant="primary"
                                            onClick={(e)=>{
                                                handleCloseThank()
                                                handleSubmit_1(e)
                                            }}>
                                        Oк
                                    </Button>
                                </Modal.Footer>
                            </Modal>


                            <Modal
                                style={{color: 'white', marginTop:'130px'}}
                                show={showAccess}
                                onHide={handleCloseAccess}
                                backdrop="static"
                                keyboard={false}
                                className='my-modal'
                            >
                                <Modal.Header style={{backgroundColor:'#090b0c'}} closeButton>

                                </Modal.Header>
                                <Modal.Body className='abv'>
                                    <p style={{width:'100%', textAlign:'center', color:'black', marginTop:'25px', fontSize:'30px'}}>Ваши данные</p>
                                    <ul className="data_ul" style={{marginTop:'20px'}}>
                                        <li><pre><b>Фамилия:</b>   {fio}</pre></li>
                                        <li><pre><b>Имя:</b>   {name}</pre></li>
                                        <li><pre><b>Отчество:</b>   {otch}</pre></li>
                                        <li><pre><b>Телефон</b>   {phone}</pre></li>
                                        <li><pre><b>Город:</b>   {city}</pre></li>
                                        <li><pre><b>Улица:</b>   {street}</pre></li>
                                    </ul>
                                    <b style={{fontSize:'30px', color:'black', width:'100%', textAlign:'center', marginTop:'25px', display:'block'}}>Вы подтверждаете их?</b>
                                </Modal.Body>
                                <Modal.Footer style={{border: 'black', height: '155px'}} className='abv'>
                                    <Button onClick={()=>{
                                        handleCloseAccess()
                                        handleShow()
                                    }} style={{width:'170px'}} className='my-button' variant="primary">
                                        <pre style={{fontSize:'15px'}}><b>«</b>  Вернуться назад</pre>
                                    </Button>
                                    <Button className='my-button' variant="primary"
                                            onClick={()=>{
                                                handleCloseAccess()
                                                handleShowThank()
                                                Order()
                                            }}>
                                        Да
                                    </Button>
                                </Modal.Footer>
                            </Modal>


                            {user.isAuth ?
                                <Modal
                                    style={{color: 'white', marginTop:'137px'}}
                                    show={show}
                                    onHide={handleClose}
                                    backdrop="static"
                                    keyboard={false}
                                    className='my-modal'
                                >
                                    <Modal.Header style={{backgroundColor:'#090b0c'}} closeButton>
                                        <Modal.Title>Сделать заказ</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='abv'>
                                        <Form.Control value={fio} onChange={(e)=> {
                                            setFi(e.target.value)
                                        }} style={{marginTop:'40px'}} placeholder='Фамилия'/>

                                        <Form.Control value={name} onChange={(e)=> {
                                            setName(e.target.value)
                                        }} style={{marginTop:'40px'}} placeholder='Имя'/>

                                        <Form.Control value={otch} onChange={(e)=> {
                                            setOtch(e.target.value)
                                        }} style={{marginTop:'40px'}} placeholder='Отчество'/>

                                        <Form.Control value={phone} onChange={(e)=> {
                                            setPhone(e.target.value)
                                        }} style={{marginTop:'40px'}} placeholder='Номер телефона'/>

                                        <Form.Control value={city} onChange={(e)=> {
                                            setCity(e.target.value)
                                        }} style={{marginTop:'40px'}} placeholder='Город'/>

                                        <Form.Control value={street} onChange={(e)=> {
                                            setStreet(e.target.value)
                                        }} style={{marginTop:'40px'}} placeholder='Улица'/>
                                        <b style={{marginTop:'15px', color:'black', fontSize:'25px', width:'100%', display:'block', textAlign:'center'}} >Размер:{size_state}</b>
                                        {/*<Form.Control value={size_state}/>*/}
                                        {render &&
                                        <b style={{marginTop:'15px', color:'black', fontSize:'25px', width:'100%', display:'block', textAlign:'center'}} >Цвет:{render[default_color].color}</b>
                                        }
                                        {/*<Form.Control value={render[default_color].color}/>*/}

                                    </Modal.Body>
                                    <Modal.Footer style={{border: 'black', height: '75px'}} className='abv'>
                                        <Button className='my-button' variant="primary"
                                                onClick={()=>{
                                                    handleNext()
                                                }}>
                                            Далее
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                :
                                <Modal
                                    style={{color: 'white', marginTop:'140px'}}
                                    show={showAvt}
                                    onHide={handleCloseAvt}
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
                            }


                        </div>
                        <ul id='har_list'>
                            <pre>
                                <li className="har_li">
                                    <b className='b' style={{fontWeight:'1000',}}>Бренд: </b>
                                    <p style={{fontSize:'20px', width:'50%'}}>{brand}</p>
                                </li>
                            </pre>
                            <pre>
                                <li className="har_li">
                                    <b className='b' style={{fontWeight:'1000',}}>Категория: </b>
                                    <p style={{fontSize:'20px', width:'50%'}}>{cat}</p>
                                </li>
                            </pre>
                            <pre>
                                <li className="har_li">
                                    <b className='b' style={{fontWeight:'1000',}}>Сезон: </b>
                                    <p style={{fontSize:'20px', width:'50%'}}>{mat}</p>
                                </li>
                            </pre>
                            {/*<pre>*/}
                            {/*    <li className="har_li">*/}
                            {/*        <b className='b' style={{fontWeight:'1000',}}>Размер: </b>*/}
                            {/*        <p style={{fontSize:'20px', width:'50%'}}>{sizeName}</p>*/}
                            {/*    </li>*/}
                            {/*</pre>*/}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="desc">
                <h1>Описание</h1>
                <p style={{color:'#AFAFAF', fontSize:'20px'}}>{product.description}</p>
                {/*<h1 id='comms'>Комментарии</h1>*/}
                {/*<div className="comments_block">*/}
                {/*    <div className="inp_block">*/}
                {/*        <form style={{width:'100%'}} onSubmit={handleSubmit}>*/}
                {/*            <input*/}
                {/*                value={value}*/}
                {/*                onChange={(e)=>setValue(e.target.value)}*/}
                {/*                className='inp' type="text"*/}
                {/*                placeholder='Напишите комментарий'*/}
                {/*            />*/}
                {/*        </form>*/}
                {/*        <img onClick={addComm} className='arr' src={arr} alt=""/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*{comms && comms.map((i)=>{*/}
                {/*    const time_first = i.time.split(',')[1]*/}
                {/*    const time = time_first.split(':')[0]+':'+time_first.split(':')[1]*/}
                {/*    const date = i.time.split(',')[0]*/}

                {/*    const date_number = date.split('.')[0]*/}
                {/*    const date_month_num = date.split('.')[1]*/}

                {/*    let month*/}
                {/*    if(date_month_num=='01'){*/}
                {/*        month = 'января'*/}
                {/*    }*/}
                {/*    else if(date_month_num=='02'){*/}
                {/*        month = 'февраля'*/}
                {/*    }*/}
                {/*    else if(date_month_num=='03'){*/}
                {/*        month = "марта"*/}
                {/*    }*/}
                {/*    else if(date_month_num=='04'){*/}
                {/*        month = "апреля"*/}
                {/*    }*/}
                {/*    else if(date_month_num=='05'){*/}
                {/*        month = "мая"*/}
                {/*    }*/}
                {/*    else if(date_month_num=='06'){*/}
                {/*        month = "июня"*/}
                {/*    }*/}
                {/*    else if(date_month_num=='07'){*/}
                {/*        month = "июля"*/}
                {/*    }*/}
                {/*    else if(date_month_num=='08'){*/}
                {/*        month = "августа"*/}
                {/*    }*/}
                {/*    else if(date_month_num=='09'){*/}
                {/*        month = "сентября"*/}
                {/*    }*/}
                {/*    else if(date_month_num=='10'){*/}
                {/*        month = "октября"*/}
                {/*    }*/}
                {/*    else if(date_month_num=='11'){*/}
                {/*        month = "ноября"*/}
                {/*    }*/}
                {/*    else if(date_month_num=='12'){*/}
                {/*        month = "декабря"*/}
                {/*    }*/}
                {/*    return (*/}

                {/*        <div className="comm">*/}
                {/*            <div style={{width:'100%', height:'70px', display:'flex', alignItems:'center'}} className="img_name">*/}
                {/*                <div style={{overflow:'hidden', borderRadius:'50%', border:'1px solid #ffffff47'}} className="img_wind">*/}
                {/*                    <img style={{height:'100%', width:'100%'}} src={process.env.REACT_APP_BASE_URL+i.userImg}></img>*/}
                {/*                </div>*/}
                {/*                <div className="comm_title">*/}
                {/*                    <h1 className='comm_name'>{i.title}</h1>*/}
                {/*                    <p style={{color:'#b0b5c3'}}>{date_number+' '+month+',   '+time}</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="comment_inf">*/}

                {/*                <p>{i.description}</p>*/}
                {/*            </div>*/}
                {/*            {isADMIN &&*/}
                {/*                <div className="admin_comm">*/}
                {/*                    <Button className="admin_but" onClick={()=>delComm(i.id, user_token)}>Удалить комментарий</Button>*/}
                {/*                    <Button className="admin_but" onClick={()=> banUser(i.userId)} style={{marginLeft:'20px'}}>Забанить пользователя</Button>*/}
                {/*                </div>*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*})}*/}
            </div>
        </div>
    );
});

export default ProductPage;