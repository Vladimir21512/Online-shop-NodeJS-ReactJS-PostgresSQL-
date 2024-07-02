import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";

import logo from '../img/OG.png';

import {NavLink} from "react-router-dom";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE, CATALOG_RESULT_ROUTE,
    CATALOG_ROUTE,
    LOGIN_ROUTE, REGISTRATION_ROUTE,
    SEARCH_ROUTE,
    SHOP_ROUTE,
    USER_ROUTE
} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate, Link} from "react-router-dom";

import basket from "../img/image (3) 1.svg"


import {jwtDecode} from "jwt-decode";

import loop from '../img/loupe.svg'
import {toJS} from "mobx";
import button from "bootstrap/js/src/button";
import {Button, CloseButton, Dropdown, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import exit from '../img/exit-svgrepo-com (2).svg'
import {fetchBrandResult, fetchCategoryResult, fetchSeasonResult, fetchSizeResult} from "../http/deviceAPI";
import cross from '../img/cross-svgrepo-com.svg';


const NavBar = observer(() => {
    const {user, product} = useContext(Context)
    const history = useNavigate()

    const ProductList = toJS(product.StartProducts)

    let [isADMIN, setBOOL] = useState(false)

    let seaProducts = []
    let brands = toJS(product.brands)
    let cats = toJS(product.categories)
    let size = toJS(product.sizes)
    let seasons = toJS(product.materials)

    const [sexState, setSexState] = useState()

    const [value, setValue] = useState('')

        useEffect(()=> {
            setBOOL(false)
            if(user.isAuth) {
                const user_token = jwtDecode(localStorage.getItem('token'))
                if (user_token.role == 'ADMIN') {
                    setBOOL(true)
                }
            }

        },[])

    const handleSubmit = event => {
        history(SHOP_ROUTE)
        event.preventDefault()
        searchedProducts()
    };
    const searchedProducts =()=>
    {
        seaProducts=[]
        ProductList.filter(a=>{
        if(a.name.toLowerCase().includes(value.toLowerCase())) {
            seaProducts.push(a)
            product.SetSearchedProducts(seaProducts)
        }
        })
        // if(value) {
        //     product.setSearchBool(true)
        // }


        if(seaProducts.length==0){
            brands.filter(a=>{
                if(a.name.toLowerCase().includes(value.toLowerCase())) {
                    ProductList.forEach(e=>{
                        if(e.brandId==a.id) {
                            seaProducts.push(e)
                            product.SetSearchedProducts(seaProducts)
                        }
                    })

                }
            })
        }
        if(seaProducts.length==0){
            cats.filter(a=>{
                if(a.name.toLowerCase().includes(value.toLowerCase())) {
                    ProductList.forEach(e=> {
                        seaProducts.push(e)
                        product.SetSearchedProducts(seaProducts)
                    })
                }
            })
        }
        history(SEARCH_ROUTE)
    }

    const resetSrc = ()=>{
        product.setSearchBool(false)
        product.setProducts(product.First)
        product.setPage(1)
        setValue('')
        history(SHOP_ROUTE)
    }

    const [showAvt, setShowAvt] = useState(false);
    const handleCloseAvt = () => setShowAvt(false)
    const handleShowAvt = () => setShowAvt(true);

    const [showSearch, setShowSearch] = useState(false);
    const handleCloseSearch = () => setShowSearch(false)
    const handleShowSearch = () => setShowSearch(true);
    const logOut=()=>{
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }
    const goToUser=()=>{
        if(!localStorage.getItem('token')) {
            handleShowAvt()
        }
        else{
            history(USER_ROUTE)
        }
    }
    // console.log(sexState)
    const fetchBrand = (cat)=>{
        fetchBrandResult(cat, sexState).then(e=>{
            product.setCategoryResult(e)
            history(CATALOG_RESULT_ROUTE+"/"+"Бренды"+"/"+cat+"/"+sexState)
            closeCatalog()
        })
    }
    const fetchSeason = (cat)=>{
        fetchSeasonResult(cat, sexState).then(e=>{
            product.setCategoryResult(e)
            history(CATALOG_RESULT_ROUTE+"/"+"Сезоны"+"/"+cat+"/"+sexState)
            closeCatalog()
        })
    }
    const fetchCategory = (cat)=>{
        fetchCategoryResult(cat, sexState).then(e=>{
            product.setCategoryResult(e)
            history(CATALOG_RESULT_ROUTE+"/"+"Категории"+"/"+cat+"/"+sexState)
            closeCatalog()
        })
    }
    const showCatalog=()=>{
        document.getElementById('animate_catalog').style.height='204px'
        document.getElementById('animate_catalog').style.overflow = 'visible'
    }
    const closeCatalog=()=>{
        document.getElementById('animate_catalog').style.height='0px'
        document.getElementById('animate_catalog').style.overflow = 'hidden'
    }
    return (
        //<div className="container">
        <div className='NavBar'>

            <div className="topBar">
                <div className='LeftBar'>
                    <NavLink style={{width:'100%', display:'flex', textDecoration:'none'}} to={SHOP_ROUTE}>
                        <img style={{width:'250px'}} className='Log' src={logo} alt=""/>
                        {/*<h1 style={{display:'flex', alignItems:'center'}}>ONLINE-SHOP</h1>*/}
                    </NavLink>

                </div>

                <Modal
                    style={{color: 'white', marginTop:'60px'}}
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
                                    handleCloseAvt()
                                    history(REGISTRATION_ROUTE)
                                }}>
                            Авторизоваться
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    style={{color: 'white', marginTop:'130px'}}
                    show={showSearch}
                    onHide={handleCloseSearch}
                    backdrop="static"
                    keyboard={false}
                    className='my-modal'
                >
                    <Modal.Header style={{borderBottom:'none'}} closeButton>

                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'black'}} className='abv'>
                        <form className="search_inp_1" style={{width:'100%'}} onSubmit={handleSubmit}>
                            <input onChange={e=> {
                                setValue(e.target.value)
                            }} style={{backgroundColor: 'transparent', borderStyle:'none', paddingLeft:'10px', color:'white', width:'90%'}} placeholder='Найти товар' value={value} type="text"/>
                            <div style={{width:'50px'}} className="srch">

                                <img onClick={()=>{
                                    history(SHOP_ROUTE)
                                    searchedProducts()
                                }} src={loop} alt=""/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer style={{border: 'black', height: 'auto', backgroundColor:'black'}} className='abv'>
                        <Button style={{height:'50px', width:'50%', backgroundColor:'white', color:'black', border:'none'}} className='my-button' variant="primary"
                                onClick={()=>{
                                    history(SHOP_ROUTE)
                                    searchedProducts()
                                    handleCloseSearch()
                                }}>
                            Найти
                        </Button>
                    </Modal.Footer>
                </Modal>

                {user.isAuth?
                    <div className='RightBar'>
                        <button style={{width:'50px', height:'50px', backgroundColor:'#00000000', borderStyle:'none', marginRight:'50px'}} onClick={()=>handleShowSearch()}>
                            <img className='loupe' style={{width:'27px'}} src={loop} className="bsk" alt=""/>
                        </button>
                        {/*<button id="spec"  onClick={()=>history(CATALOG_ROUTE)} style={{display:'flex', width:'40px', borderStyle:'none', marginRight:'50px'}}>*/}
                        {/*    <img title='Каталог' className="bsk" style={{width:'30px'}} src={catalog_1} alt=""/>*/}
                        {/*</button>*/}
                        <button title='Профиль' style={{padding:"0", width:'40px', height:'50px', backgroundColor:'rgba(0, 0, 0, 0)', borderStyle:'none', marginRight:'50px'}} onClick={()=> {
                            // resetSrc()
                            history(USER_ROUTE)
                            product.setSearchBool(false)
                        }}>

                            <svg style={{width:'30px'}}  className='bsk' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <rect width="24" height="24" fill="none"></rect>
                                    <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"></path>
                                    <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z"></path> </g></svg>
                        </button>
                        <button title='Корзина' onClick={()=> {
                            // resetSrc()
                            history(BASKET_ROUTE)
                            product.setSearchBool(false)
                        }} style={{backgroundColor:'#00000000', borderStyle:'none', width:'40px', marginRight:'50px'}}>
                            {/*<img style={{height:'42px'}} src={basket_img} alt=""/>*/}


                            <img src={basket} className='bsk' style={{height:'31px'}} alt=""/>

                        </button>

                        <button onClick={()=> {
                            logOut()
                            history(SHOP_ROUTE)
                            product.setSearchBool(false)
                            // resetSrc()
                        }} style={{backgroundColor:'#ff000000', borderStyle:'none', marginRight:'50px'}} className='bsk'>
                            <img style={{height:'31px'}} src={exit} alt=""/>
                        </button>


                        {/*<div style={{height:'70%'}} className="menu_">*/}
                        {/*    <img src={menuSVG} alt=""/>*/}
                        {/*</div>*/}

                        {/*<div style={{width:'90%', position:'fixed', float:'right', height:'100%', backgroundColor:'red', zIndex:'10000'}} className="sideBar">*/}

                        {/*</div>*/}

                        {isADMIN &&
                            <button onClick={()=> {
                                // resetSrc()
                                history(ADMIN_ROUTE)
                                product.setSearchBool(false)
                            }} style={{marginRight:'50px'}} className='hide_but brnd'>
                                <p>Админ панель</p>
                            </button>

                        }
                    </div>
                    :
                    <div className='RightBar'>
                        <button style={{width:'50px', height:'50px', backgroundColor:'#00000000', borderStyle:'none', marginRight:'50px'}} onClick={()=>handleShowSearch()}>
                            <img style={{width:'35px'}} src={loop} className="bsk" alt=""/>
                        </button>
                        <button onClick={() => {
                            // product.setSearchBool(false)
                            // // resetSrc()
                            // goToUser()
                            history(USER_ROUTE)
                            product.setSearchBool(false)
                        }} style={{width:'70px', backgroundColor:'#00000000', borderStyle:'none', marginRight:'50px'}}>
                            <svg style={{width:'40px'}}  className='bsk' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <rect width="24" height="24" fill="none"></rect>
                                    <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"></path>
                                    <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z"></path> </g></svg>

                        </button>
                        {/*<button id="spec" onClick={()=>history(CATALOG_ROUTE)} style={{display:'flex', width:'40px', borderStyle:'none', marginRight:'50px'}}>*/}
                        {/*    <img title='Каталог' className="bsk" style={{width:'100%'}} src={catalog_1} alt=""/>*/}
                        {/*</button>*/}
                    </div>
                }
                <div className="sex_list">
                    <h1 style={{cursor:'pointer'}} onClick={()=>{
                        showCatalog()
                        setSexState(1)}}>Мужчины</h1>
                    <h1 style={{cursor:'pointer'}} onClick={()=>{
                        showCatalog()
                        setSexState(2)}}>Женщины</h1>
                    <h1 style={{cursor:'pointer'}} onClick={()=>{
                        showCatalog()
                        setSexState(3)}}>Унисекс</h1>
                </div>
                <div id='animate_catalog' className="catalog_list">
                    <div style={{width:'100%', height:'100%', backgroundColor:'white', display:'grid', alignItems:'center', justifyContent:'center', flexDirection:'column',gridTemplateRows: 'repeat(auto-fill, minmax(30%, 1fr))', gridTemplateColumns:'repeat(auto-fill, minmax(100%, 1fr))'}}>
                        <div style={{width:'100%'}}>
                        <img style={{width:'30px', cursor:'pointer', marginLeft:'20px'}} onClick={()=>closeCatalog()} src={cross} alt=""/>
                        </div>
                        {sexState==1 ?
                            <h1 style={{fontSize:'20px',color:'black', textAlign:'center'}}>Мужчинам</h1>
                            :
                            <>
                            {sexState == 2 ?
                                <h1 style={{fontSize:'20px',color:'black', textAlign:'center'}}>Женщинам</h1>
                                :
                                <h1 style={{fontSize:'20px',color:'black', textAlign:'center'}}>Унисекс</h1>
                            }
                            </>
                        }
                    </div>
                    <Dropdown className='mt-3 mt-2 '>

                        <Dropdown.Toggle style={{backgroundColor:'#060606', borderStyle:'none'}}>
                            <b> Бренды</b>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='cat_dropdown'>
                            {product.brands.map((item)=>{

                                return (<Dropdown.Item onClick={()=>fetchBrand(item.name)} key={item.id}>{item.name}</Dropdown.Item>)
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/*<Dropdown className='mt-3 mt-2'>*/}

                    {/*    <Dropdown.Toggle style={{backgroundColor:'black', borderStyle:'none'}}>*/}
                    {/*        <b>Размеры</b>*/}
                    {/*    </Dropdown.Toggle>*/}
                    {/*    <Dropdown.Menu className='cat_dropdown'>*/}
                    {/*        {product.sizes.map((item)=>{*/}

                    {/*            return (<Dropdown.Item onClick={()=>fetchSize(item.name)} key={item.id}>{item.name}</Dropdown.Item>)*/}
                    {/*        })}*/}
                    {/*    </Dropdown.Menu>*/}
                    {/*</Dropdown>*/}

                    <Dropdown className='mt-3 mt-2'>

                        <Dropdown.Toggle style={{backgroundColor:'#060606', borderStyle:'none'}}>
                            <b>Сезоны</b>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='cat_dropdown'>
                            {product.materials.map((item)=>{

                                return (<Dropdown.Item onClick={()=>fetchSeason(item.name)} key={item.id}>{item.name}</Dropdown.Item>)
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='mt-3 mt-2'>

                        <Dropdown.Toggle style={{backgroundColor:'#060606', borderStyle:'none'}}>
                            <b>Категории</b>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='cat_dropdown'>
                            {product.categories.map((item)=>{

                                return (<Dropdown.Item onClick={()=>fetchCategory(item.name)} key={item.id}>{item.name}</Dropdown.Item>)
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </div>


        </div>
        //</div>
    );
});

export default NavBar;