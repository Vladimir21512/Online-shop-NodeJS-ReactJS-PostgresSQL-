import React, {useContext, useEffect, useState} from 'react';
import button from "bootstrap/js/src/button";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE, CATALOG_RESULT_ROUTE,
    CATALOG_ROUTE,
    LOGIN_ROUTE,
    SEARCH_ROUTE,
    SHOP_ROUTE,
    USER_ROUTE
} from "../utils/consts";
import basket_img from "../img/image (3) 1.png";
import catalog_1 from "../img/menu-grid-svgrepo-com.svg";
import login from "../img/login-svgrepo-com.svg";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {jwtDecode} from "jwt-decode";
import loop from "../img/loupe.svg";
import {toJS} from "mobx";
import cross from '../img/cross-svgrepo-com.svg'
import arrow from "../img/arrow-up-svgrepo-com.svg";
import {ListGroup} from "react-bootstrap";
import {
    fetchBrand,
    fetchBrandResult,
    fetchCategoryResult, fetchMaterial,
    fetchProduct,
    fetchSeasonResult, fetchSize,
    fetchSizeResult
} from "../http/deviceAPI";
import {observer} from "mobx-react-lite";

const SideBar = observer(() => {
    const history = useNavigate()
    const {user, product} = useContext(Context)
    let [isADMIN, setBOOL] = useState(false)

    const [value,setValue] = useState()
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
        fetchBrand().then(data=>{
            product.setBrands(data.brands)
        })
        fetchSize().then(data=>{
            product.setSizes(data.sizes)
        })
        fetchMaterial().then(data=>{
            product.setMaterials(data.materials)
        })
        fetchProduct().then(data=>{
            product.setProducts(data.rows)
            product.setFirst(data.rows)
        })
    },[])



    const resetSrc = ()=>{
        product.setSearchBool(false)
        product.setProducts(product.First)
        product.setPage(1)
        setValue('')
        history(SHOP_ROUTE)
    }
    const closeSideBar=()=>{
        document.getElementById('side_anim').style.right='-100%'
    }

    const showListMatMale = ()=>{
        if(document.getElementById('MatList').style.height == '0px') {
            document.getElementById('MatList').style.height = '280px'
        }
        else{
            document.getElementById('MatList').style.height = '0px'
        }
    }
    const showListCatMale = ()=>{
        if(document.getElementById('CatList').style.height == '0px') {
            document.getElementById('CatList').style.height = '280px'
        }
        else{
            document.getElementById('CatList').style.height = '0px'
        }
    }
    const showListBrandMale = ()=>{
        if(document.getElementById('BrandList').style.height == '0px'){
            document.getElementById('BrandList').style.height = '280px'
        }
        else{
            document.getElementById('BrandList').style.height = '0px'
        }
    }


    const showListMatWomen = ()=>{
        if(document.getElementById('MatListWomen').style.height == '0px') {
            document.getElementById('MatListWomen').style.height = '280px'
        }
        else{
            document.getElementById('MatListWomen').style.height = '0px'
        }
    }
    const showListCatWomen = ()=>{
        if(document.getElementById('CatListWomen').style.height == '0px') {
            document.getElementById('CatListWomen').style.height = '280px'
        }
        else{
            document.getElementById('CatListWomen').style.height = '0px'
        }
    }
    const showListBrandWomen = ()=>{
        if(document.getElementById('BrandListWomen').style.height == '0px'){
            document.getElementById('BrandListWomen').style.height = '280px'
        }
        else{
            document.getElementById('BrandListWomen').style.height = '0px'
        }
    }


    const showListMatUni = ()=>{
        if(document.getElementById('MatListUni').style.height == '0px') {
            document.getElementById('MatListUni').style.height = '280px'
        }
        else{
            document.getElementById('MatListUni').style.height = '0px'
        }
    }
    const showListCatUni = ()=>{
        if(document.getElementById('CatListUni').style.height == '0px') {
            document.getElementById('CatListUni').style.height = '280px'
        }
        else{
            document.getElementById('CatListUni').style.height = '0px'
        }
    }
    const showListBrandUni = ()=>{
        if(document.getElementById('BrandListUni').style.height == '0px'){
            document.getElementById('BrandListUni').style.height = '280px'
        }
        else{
            document.getElementById('BrandListUni').style.height = '0px'
        }
    }

    const [sexState, setSexState] = useState()
    const fetchBrand_1 = (cat)=>{
        history(CATALOG_RESULT_ROUTE+"/"+"Бренды"+"/"+cat+"/"+sexState)
    }
    const fetchSize_1 = (cat)=>{
        history(CATALOG_RESULT_ROUTE+"/"+"Размеры"+"/"+cat+"/"+sexState)
    }
    const fetchSeason_1 = (cat)=>{
        history(CATALOG_RESULT_ROUTE+"/"+"Сезоны"+"/"+cat+"/"+sexState)
    }
    const fetchCategory_1 = (cat)=>{
        history(CATALOG_RESULT_ROUTE+"/"+"Категории"+"/"+cat+"/"+sexState)
    }

    const showMaleList=()=>{
        if(document.getElementById('male_list').style.height=='0px') {
            document.getElementById('male_list').style.height = '500px'
            document.getElementById('women_list').style.height = '0px'
            document.getElementById('uni_list').style.height = '0px'
        }
        else{
            document.getElementById('male_list').style.height = '0px'
        }
        setSexState(1)
    }
    const showWomenList=()=>{
        if(document.getElementById('women_list').style.height=='0px') {
            document.getElementById('women_list').style.height = '500px'
            document.getElementById('male_list').style.height = '0px'
            document.getElementById('uni_list').style.height = '0px'
        }
        else{
            document.getElementById('women_list').style.height = '0px'
        }
        setSexState(2)
    }
    const showUniList=()=>{
        if(document.getElementById('uni_list').style.height=='0px') {
            document.getElementById('uni_list').style.height = '500px'
            document.getElementById('male_list').style.height = '0px'
            document.getElementById('women_list').style.height = '0px'
        }
        else{
            document.getElementById('uni_list').style.height = '0px'
        }
        setSexState(3)
    }

    return (
        <div id="side_anim" style={{right:'-100%'}} className='SideBar'>
            <div className="exit" style={{width:'100%', height:'70px'}}>
                <img onClick={()=> closeSideBar()} style={{height:'40%', marginRight:'20px'}} src={cross} alt=""/>
            </div>



            <div style={{width:'100%'}} id="male_section">
                <h1 onClick={()=>showMaleList()}  style={{cursor:'pointer', width:'100%', textAlign:'center'}}>Мужчинам</h1>
                <div style={{height:'0px', overflow:'hidden', width:'100%', transition:'0.2s ease', backgroundColor:'gray'}} id="male_list">
                    <div style={{marginTop:'26px'}} onClick={()=> showListBrandMale()} className="filt_div">
                        <h1 style={{height:'100%', width:'100%', textAlign:'center'}} >Бренды</h1>
                    </div>
                    <ListGroup id="BrandList" style={{height:'0px', backgroundColor:'white', width:'100%', overflow:'hidden'}}>
                        {product.brands.map((size)=>{
                            return(

                                <ListGroup.Item
                                    onClick={()=> {
                                        closeSideBar()
                                        fetchBrand_1(size.name)
                                    }}
                                    style={{color:'black', fontSize:'25px', border:'none'}}
                                    key={size.id}
                                >

                                    {size.name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <div onClick={()=> showListCatMale()} className="filt_div">
                        <h1 style={{height:'100%', width:'100%', textAlign:'center'}} >Категории</h1>
                    </div>
                    <ListGroup id="CatList" style={{height:'0px', backgroundColor:'white', width:'100%', overflow:'hidden'}}>
                        {product.categories.map((size)=>{
                            return(

                                <ListGroup.Item
                                    onClick={()=> {
                                        closeSideBar()
                                        fetchCategory_1(size.name)
                                    }}
                                    style={{color:'black', fontSize:'25px', border:'none'}}
                                    key={size.id}
                                >

                                    {size.name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <div onClick={()=> showListMatMale()} className="filt_div">
                        <h1 style={{height:'100%', width:'100%', textAlign:'center'}} >Сезоны</h1>
                    </div>
                    <ListGroup id="MatList" style={{height:'0px', backgroundColor:'white', width:'100%', overflow:'hidden'}}>
                        {product.materials.map((size)=>{
                            return(

                                <ListGroup.Item
                                    onClick={()=> {
                                        closeSideBar()
                                        fetchSeason_1(size.name)
                                    }}
                                    style={{color:'black', fontSize:'25px', border:'none'}}
                                    key={size.id}
                                >

                                    {size.name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </div>
            </div>


            <div style={{width:'100%'}} id="male_section">
                <h1 onClick={()=>showWomenList()}  style={{cursor:'pointer', width:'100%', textAlign:'center'}}>Женщинам</h1>
                <div style={{height:'0px', overflow:'hidden', width:'100%', transition:'0.2s ease', backgroundColor:'gray'}} id="women_list">
                    <div style={{marginTop:'26px'}} onClick={()=> showListBrandWomen()} className="filt_div">
                        <h1 style={{height:'100%', width:'100%', textAlign:'center'}} >Бренды</h1>
                    </div>
                    <ListGroup id="BrandListWomen" style={{height:'0px', backgroundColor:'white', width:'100%', overflow:'hidden', transition:'0.2s ease'}}>
                        {product.brands.map((size)=>{
                            return(

                                <ListGroup.Item
                                    onClick={()=> {
                                        closeSideBar()
                                        fetchBrand_1(size.name)
                                    }}
                                    style={{color:'black', fontSize:'25px', border:'none'}}
                                    key={size.id}
                                >

                                    {size.name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <div onClick={()=> showListCatWomen()} className="filt_div">
                        <h1 style={{height:'100%', width:'100%', textAlign:'center'}} >Категории</h1>
                    </div>
                    <ListGroup id="CatListWomen" style={{height:'0px', backgroundColor:'white', width:'100%', overflow:'hidden', transition:'0.2s ease'}}>
                        {product.categories.map((size)=>{
                            return(

                                <ListGroup.Item
                                    onClick={()=> {
                                        closeSideBar()
                                        fetchCategory_1(size.name)
                                    }}
                                    style={{color:'black', fontSize:'25px', border:'none'}}
                                    key={size.id}
                                >

                                    {size.name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <div onClick={()=> showListMatWomen()} className="filt_div">
                        <h1 style={{height:'100%', width:'100%', textAlign:'center'}} >Сезоны</h1>
                    </div>
                    <ListGroup id="MatListWomen" style={{height:'0px', backgroundColor:'white', width:'100%', overflow:'hidden', transition:'0.2s ease'}}>
                        {product.materials.map((size)=>{
                            return(

                                <ListGroup.Item
                                    onClick={()=> {
                                        closeSideBar()
                                        fetchSeason_1(size.name)
                                    }}
                                    style={{color:'black', fontSize:'25px', border:'none'}}
                                    key={size.id}
                                >

                                    {size.name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </div>
            </div>


            <div style={{width:'100%'}} id="male_section">
                <h1 onClick={()=>showUniList()}  style={{cursor:'pointer', width:'100%', textAlign:'center'}}>Унисекс</h1>
                <div style={{height:'0px', overflow:'hidden', width:'100%', transition:'0.2s ease', backgroundColor:'gray'}} id="uni_list">
                    <div style={{marginTop:'26px'}} onClick={()=> showListBrandUni()} className="filt_div">
                        <h1 style={{height:'100%', width:'100%', textAlign:'center'}} >Бренды</h1>
                    </div>
                    <ListGroup id="BrandListUni" style={{height:'0px', backgroundColor:'white', width:'100%', overflow:'hidden', transition:'0.2s ease'}}>
                        {product.brands.map((size)=>{
                            return(

                                <ListGroup.Item
                                    onClick={()=> {
                                        closeSideBar()
                                        fetchBrand_1(size.name)
                                    }}
                                    style={{color:'black', fontSize:'25px', border:'none'}}
                                    key={size.id}
                                >

                                    {size.name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <div onClick={()=> showListCatUni()} className="filt_div">
                        <h1 style={{height:'100%', width:'100%', textAlign:'center'}} >Категории</h1>
                    </div>
                    <ListGroup id="CatListUni" style={{height:'0px', backgroundColor:'white', width:'100%', overflow:'hidden', transition:'0.2s ease'}}>
                        {product.categories.map((size)=>{
                            return(

                                <ListGroup.Item
                                    onClick={()=> {
                                        closeSideBar()
                                        fetchCategory_1(size.name)
                                    }}
                                    style={{color:'black', fontSize:'25px', border:'none'}}
                                    key={size.id}
                                >

                                    {size.name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <div onClick={()=> showListMatUni()} className="filt_div">
                        <h1 style={{height:'100%', width:'100%', textAlign:'center'}} >Сезоны</h1>
                    </div>
                    <ListGroup id="MatListUni" style={{height:'0px', backgroundColor:'white', width:'100%', overflow:'hidden', transition:'0.2s ease'}}>
                        {product.materials.map((size)=>{
                            return(

                                <ListGroup.Item
                                    onClick={()=> {
                                        closeSideBar()
                                        fetchSeason_1(size.name)
                                    }}
                                    style={{color:'black', fontSize:'25px', border:'none'}}
                                    key={size.id}
                                >

                                    {size.name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </div>
            </div>



            {user.isAuth &&
                <button style={{marginRight:'0', width:'100%', height:'50px', backgroundSize:'65%',color:'white', backgroundColor:'black', borderStyle:'none', fontSize:'30px', marginTop:'10px'}} onClick={()=> {
                    closeSideBar()
                    logOut()
                    history(SHOP_ROUTE)

                }} >
                    Выйти
                </button>
            }

            {user.isAuth &&
                <>
                    {isADMIN &&
                        <button style={{backgroundColor:'black',width:'100%', height:'50px',color:'white', borderStyle:'none', fontSize:'30px', marginTop:'10px'}} onClick={()=> {
                            history(ADMIN_ROUTE)
                            closeSideBar()
                            product.setSearchBool(false)
                            resetSrc()
                        }} >
                            <p style={{color:'white'}}  id="admin_p">Админ панель</p>
                        </button>
                    }
                </>
            }
            <b style={{marginTop:'100px', fontSize:'30px'}}>scndngspprt@gmail.com</b>
        </div>
    );
});

export default SideBar;