import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import {Context} from "../index";
import {jwtDecode} from "jwt-decode";
import logo from '../img/OG.png';
import menu from '../img/menu-svgrepo-com (1).svg'
import SideBar from "./SideBar";
import {BASKET_ROUTE, SEARCH_ROUTE, SHOP_ROUTE, USER_ROUTE} from "../utils/consts";
import loupe from '../img/loupe.svg'
import basket from '../img/image (3) 1.svg'
import Modal from "react-bootstrap/Modal";
import loop from "../img/loupe.svg";
import {Button} from "react-bootstrap";
import {toJS} from "mobx";
const FixedFootBar = () => {
    const history = useNavigate()
    const {user, product} = useContext(Context)
    let [isADMIN, setBOOL] = useState(false)

    const [showSearch, setShowSearch] = useState(false);
    const handleCloseSearch = () => setShowSearch(false)
    const handleShowSearch = () => setShowSearch(true);
    const logOut=()=>{
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }
    useEffect(()=> {

        setBOOL(false)
        if(user.isAuth) {
            const user_token = jwtDecode(localStorage.getItem('token'))
            if (user_token.role == 'ADMIN') {
                setBOOL(true)
            }
        }
    },[isADMIN])
    const resetSrc = ()=>{
        product.setSearchBool(false)
        product.setProducts(product.First)
        product.setPage(1)
    }
    const showSideBar=()=>{
        document.getElementById('side_anim').style.right='0'
    }
    const handleSubmit = event => {
        history(SHOP_ROUTE)
        event.preventDefault()
        searchedProducts()
    };
    const ProductList = toJS(product.StartProducts)
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
    let seaProducts = []
    let brands = toJS(product.brands)
    let cats = toJS(product.categories)

    const [value, setValue] = useState('')

    return (
        <div style={{backgroundColor:'black'}} className='FixedFoot'>
            <img onClick={()=> history(SHOP_ROUTE)} style={{height:'70%', cursor:'pointer'}} src={logo} alt=""/>
            <img className='loupe' onClick={()=> {handleShowSearch()}} style={{cursor:'pointer'}} src={loupe} alt=""/>

            <svg className='loupe bsk' onClick={()=>history(USER_ROUTE)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <rect width="24" height="24" fill="none"></rect>
                    <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"></path>
                    <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z">
                    </path>
                </g>
            </svg>

            {user.isAuth &&
            <img className='loupe' onClick={()=> {history(BASKET_ROUTE)}} style={{cursor:'pointer'}} src={basket} alt=""/>
            }
            <img onClick={()=>showSideBar()} style={{height:'70%'}} src={menu} alt=""/>
            <SideBar></SideBar>
            <Modal
                style={{color: 'white', marginTop:'130px'}}
                show={showSearch}
                onHide={handleCloseSearch}
                backdrop="static"
                keyboard={false}
                className='my-modal'
            >
                <Modal.Header  closeButton>

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
                    <Button style={{height:'50px', width:'50%'}} className='my-button' variant="primary"
                            onClick={()=>{
                                history(SHOP_ROUTE)
                                searchedProducts()
                                handleCloseSearch()
                            }}>
                        Найти
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FixedFootBar;