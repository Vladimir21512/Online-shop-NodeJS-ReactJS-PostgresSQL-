import React, {useContext, useEffect, useState} from 'react';
import $ from 'jquery';
import BrandBar from "../components/BrandBar";
import CategoryBar from "../components/CategoryBar";
import SizeBar from "../components/SizeBar";
import MaterialBar from "../components/MaterialBar";
import PriceBar from "../components/PriceBar";

import DeviceList from "../components/DeviceList";
import PremiumDeviceList from "../components/PremiumDeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {
    fetchAll,
    fetchBrand,
    fetchCategory, fetchColors,
    fetchMaterial,
    fetchPremiumProduct,
    fetchProduct,
    fetchSize
} from "../http/deviceAPI";
import {Button} from "react-bootstrap";

import sliderParka from '../img/parka.png';
// import sliderImg from '../img/BACK_2.jpg';
import sliderImg from '../img/Group40.png';
import sliderImg_1 from '../img/BACK_3.jpg';
import filterImg from '../img/filter-list-svgrepo-com.svg';
import FilterModal from "../components/modal/FilterModal";
import {jwtDecode} from "jwt-decode";
import {toJS} from "mobx";
import Pages from "../components/Pages";
import {check, checkBan} from "../http/userAPI";
import PriceDistance from "../components/PriceDistance";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const Shop = observer(() => {
    const {product, user} = useContext(Context)

    useEffect(()=>{
        product.setSearchBool(false)
        fetchCategory().then(data=> {
            product.setCategories(data.categories)
        })
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
        fetchPremiumProduct().then(data=>{
            product.setPremiumProducts(data)
        })
        fetchColors().then(e=>{
            product.SetColors(e.colors)
        })

        fetchAll().then((e)=>product.setStartProducts(e))

        if(user.isAuth) {
            checkBan(jwtDecode(localStorage.getItem('token')).id, localStorage.getItem('token')).then(e => {
                if (e.message != jwtDecode(localStorage.getItem('token')).isBanned) {
                    user.setUser({})
                    user.setIsAuth(false)
                    localStorage.removeItem('token')
                }
            })
        }
    },[])

    // useEffect(() => {
    //     fetchProduct(product.SelectedCategory.id, product.selectedBrand.id, product.SelectedMaterial.id, product.SelectedSize.id, product.Order,product.limit,product.page).then(data => {
    //         product.setProducts(data.rows)
    //         product.setTotalCount(data.count)
    //     })
    // }, [product.SelectedCategory, product.selectedBrand, product.SelectedMaterial, product.SelectedSize, product.Order, product.page])
    useEffect(() => {
        fetchProduct(product.SelectedCategory.id, product.selectedBrand.id, product.SelectedMaterial.id, product.Order,product.limit,product.page).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product.page])

    const [value, setValue] =  React.useState([0,100000]);
    const rangeSelector = (event, newValue) => {
        setValue(newValue);
        setStart(value[0])
        setFinish(value[1])
    };
    const setFilt=()=>{
        fetchProduct(product.SelectedCategory.id, product.selectedBrand.id, product.SelectedMaterial.id, product.Order,product.limit,product.page, start, finish).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }
    const [start, setStart] = useState(0)
    const [finish, setFinish] = useState(100000)
    const resetSearch = ()=>{

        // product.setSelectedCategory([])
        // product.setSelectedSize([])
        // product.setMaterials([])
        // product.setSelectedBrand([])
        // product.setOrder(undefined)
        setStart(0)
        setFinish(100000)
        setValue([0,100000])
        fetchProduct(null, null, null, null, null,null,null, null, null).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }

    //
    // const [filterVisible, setFilterVisible] = useState(false)

    const setFilterVisible = ()=>{
        if(document.getElementById('filt_id').style.height=='0px') {
            document.getElementById('filt_id').style.height = 'auto'
        }
        else{
            document.getElementById('filt_id').style.height = '0px'
        }
    }


    return (
        <>
            {toJS(product.searchBool)==false &&
            <div className="slider">
                <div className="all">
                    <input defaultChecked="" type="radio" name="respond" id="desktop" />
                    <article style={{ height: "100%" }} id="slider">
                        <input defaultChecked type="radio" name="slider" id="switch1" />
                        <input type="radio" name="slider" id="switch2" />
                        <input type="radio" name="slider" id="switch3" />
                        <input type="radio" name="slider" id="switch4" />
                        <input type="radio" name="slider" id="switch5" />
                        <div id="slides">
                            <div id="overflow">
                                <div className="image">
                                    <article style={{backgroundImage:'url("'+sliderImg+'")', backgroundSize:'cover', backgroundPosition:'center'}}>
                                        <a style={{width:'100%', height:'100%', textDecoration:'none'}} href="https://t.me/AscendingMarketFOREVER/527">
                                            <div style={{ backgroundPosition:'center', justifyContent:'flex-start'}} className='slide_div'>
                                                <div id='slide1_image' >
                                                    <pre style={{height:'58px', width:'100%', fontSize:'20px', display:'flex', alignItems:'center', justifyContent:'center'}}> <p style={{fontFamily:'\'Oswald\', sans-serif'}}>ascending market | suvorov stone</p> </pre>
                                                    <p style={{zIndex:'10', height:'auto'}} className='slider_text'>розыгрыш на парку c.p.company!</p>
                                                </div>
                                                    {/*<div style={{width:'100%', display:'flex', alignItem:'center', justifyContent:'center', height:'50px', marginTop:'100px', backgroundColor:'#ff000000'}} className="but_slide_1">*/}
                                                {/*    /!*<Button className='slide_but'>*!/*/}
                                                {/*    /!*    <a style={{textDecoration:'none', color:'white'}} >*!/*/}
                                                {/*    /!*        <b>*!/*/}
                                                {/*    /!*    Участвовать*!/*/}
                                                {/*    /!*        </b>*!/*/}

                                                {/*    /!*    </a>*!/*/}
                                                {/*    /!*</Button>*!/*/}
                                                {/*</div>*/}

                                            </div>
                                        </a>
                                    </article>

                                    <article style={{backgroundImage:'url("'+sliderImg_1+'")', backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
                                        <a style={{width:'100%', height:'100%', textDecoration:'none'}} href="https://t.me/AscendingMarketFOREVER/527">
                                            <div style={{ backgroundPosition:'center', justifyContent:'flex-start'}} className='slide_div'>
                                                <div id='slide1_image' style={{display:'flex', justifyContent:'center'}}>
                                                    <p style={{zIndex:'10', height:'auto', marginTop:'0'}} className='slider_text'>скидки 40% на все пуховики!</p>

                                                </div>
                                            </div>
                                        </a>
                                    </article>

                                    {/*<article >*/}
                                    {/*    <div style={{ backgroundImage: 'url("' + sliderImg + '")'}} className='slide_div'>*/}
                                    {/*        <p style={{zIndex:'10'}} className='slider_text'>розыгрыш свитшот dior!</p>*/}
                                    {/*        <Button className='slide_but'>*/}
                                    {/*            Участвовать*/}
                                    {/*        </Button>*/}

                                    {/*    </div>*/}

                                    {/*</article>*/}

                                    {/*<article >*/}
                                    {/*    <div style={{ backgroundImage: 'url("' + sliderImg + '")'}} className='slide_div'>*/}
                                    {/*        <p style={{zIndex:'10'}} className='slider_text'>розыгрыш свитшот dior!</p>*/}
                                    {/*        <Button className='slide_but'>*/}
                                    {/*            Участвовать*/}
                                    {/*        </Button>*/}

                                    {/*    </div>*/}

                                    {/*</article>*/}

                                    {/*<article >*/}
                                    {/*    <div style={{ backgroundImage: 'url("' + sliderImg + '")'}} className='slide_div'>*/}
                                    {/*        <p style={{zIndex:'10'}} className='slider_text'>розыгрыш свитшот dior!</p>*/}
                                    {/*        <Button className='slide_but'>*/}
                                    {/*            Участвовать*/}
                                    {/*        </Button>*/}

                                    {/*    </div>*/}

                                    {/*</article>*/}


                                </div>
                            </div>
                        </div>
                        <div id="controls">
                            <label htmlFor="switch1" />
                            <label htmlFor="switch2" />
                            <label htmlFor="switch3" />
                            <label htmlFor="switch4" />
                            <label htmlFor="switch5" />
                        </div>
                        <div
                            style={{ backgroundColor: "rgba(0, 0, 0, 0)", opacity: 0 }}
                            id="active"
                        >
                            <label htmlFor="switch1" />
                            <label htmlFor="switch2" />
                            <label htmlFor="switch3" />
                            <label htmlFor="switch4" />
                            <label htmlFor="switch5" />
                        </div>
                    </article>
                </div>
            </div>
            }

            <div className='products'>
                {(toJS(product.searchBool)==false && product.premiumProducts.length!=0) &&
                        <div style={{marginBottom:'160px', minHeight:'500px'}} className="premium">

                            <h1 style={{color:'white', textAlign:'center'}}>Товары для срочной продажи</h1>
                                <PremiumDeviceList/>
                        </div>
                }

                <div style={{backgroundColor:'white', borderRadius:'20px'}} id='filt_id' className="filtres col-1">
                    {/*{toJS(product.searchBool)==false &&*/}
                    {/*    <h1 style={{marginBottom:'40px'}}>Фильтры</h1>*/}
                    {/*}*/}
                    {/*{toJS(product.searchBool)==false &&*/}
                    {/*<BrandBar/>*/}
                    {/*}*/}

                    {/*{toJS(product.searchBool)==false &&*/}
                    {/*<CategoryBar/>*/}
                    {/*}*/}
                    {/*{toJS(product.searchBool)==false &&*/}
                    {/*    <SizeBar/>*/}
                    {/*}*/}
                    {/*{toJS(product.searchBool)==false &&*/}
                    {/*<MaterialBar/>*/}
                    {/*}*/}

                    {/*{toJS(product.searchBool)==false &&*/}
                    {/*    <PriceBar/>*/}
                    {/*}*/}
                    {toJS(product.searchBool)==false &&
                        // <div style={{borderStyle:'none'}}>
                        //     <h1 style={{marginTop:'20px', fontSize:'30px'}}>Диапозон цен</h1>
                        //     <p style={{marginTop:'20px'}}>от</p>
                        //     <input style={{width:'100%'}} value={start} className='distance_inp'  onChange={e=>{setStart(e.target.value)}} type="range" min="0" max="100000" placeholder='от'/>
                        //     <p style={{marginTop:'20px'}}>до</p>
                        //     <input style={{width:'100%'}} value={finish} className='distance_inp'  onChange={e=>setFinish(e.target.value)} type="range" min="0" max="100000" placeholder='до'/>
                        //
                        //     <pre>{start}руб.-{finish}руб.</pre>
                        //
                        // </div>
                        <div style={{
                            width: '100%',
                            display: 'flex'
                        }}>
                            <h3 style={{marginBottom:'40px', color:'black',marginTop:'20px'}}>Диапозон цен</h3>
                            <div className="Mui">
                                <Slider
                                    className='inp_rng'
                                    value={value}
                                    max={100000}
                                    min={0}
                                    onChange={rangeSelector}
                                    valueLabelDisplay="auto"
                                />
                            </div>
                            <p style={{marginLeft:'auto', marginRight:'auto', fontSize:'25px', textAlign:'center', color:'black'}}>{value[0]}руб. -  {value[1]} руб.</p>
                            <Button className="dist_but" onClick={()=>setFilt()} style={{marginTop:'30px', float:'left', border:'1px solid gray', borderRadius:'10px'}}>Применить</Button>
                            <Button className="dist_but" onClick={()=> resetSearch()} style={{marginTop:'30px', float:'right', border:'1px solid gray', marginBottom:'30px', borderRadius:'10px'}}>Сбросить</Button>
                        </div>
                    }

                </div>
                  <DeviceList/>

            </div>

            {toJS(product.searchBool)==false &&
            <Pages/>
            }
        </>
    );
});

export default Shop;