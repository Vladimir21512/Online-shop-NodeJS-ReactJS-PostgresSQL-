import React, {useEffect, useState} from 'react';
import {deleteBasketProduct, fetchBasketProduct} from "../http/basketAPI";
import {fetchBrand, fetchCategory, fetchMaterial, fetchProduct, fetchSize} from "../http/deviceAPI";
import {useNavigate} from 'react-router-dom'
import {forEach} from "react-bootstrap/ElementChildren";
import {Button} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../utils/consts";
import BasketElement from "../components/BasketElement";

const Basket = () => {
    const history = useNavigate(0)
    const [basketProducts, getProducts] = useState(0)
    const [allProducts, getAllProducts] = useState(0)
    // let prodId = []
    const user_token = localStorage.getItem('token')

    const [BRAND, setBRAND] =useState(0)
    const [CAT, setCAT] = useState(0)
    const [SIZE, setSIZE] = useState(0)
    const [MAT, setMAT] = useState(0)

    const [renderProducts_, setRender] = useState(0)

    const [summary,setSummary] = useState(0)
    let summ = 0
    let renderProducts = []

    let Products  = []

    useEffect(()=> {

        fetchBasketProduct(user_token).then((e) =>
        {
            getProducts(e)
            e.forEach(A=>{
                summ+=A.product.price
                setSummary(summ)
            })
            return basketProducts
        }).then(()=>{
            fetchMaterial().then((e)=>{
                setMAT(e.materials)
            })
            fetchCategory().then((e)=>{
                setCAT(e.categories)
            })
            fetchSize().then(e=>{
                setSIZE(e.sizes)
            })
            fetchBrand().then(e=>{
                setBRAND(e.brands)
            })
        })


    }, [])

        if(basketProducts!=0){
            basketProducts.forEach(e=>{

                e.product.del_id = e.id
                let prod = e.product
                renderProducts.push(prod)
            })
        }
        return (
            <div className='bask_div'>
                <h1 className='marg' style={{color: 'white'}}>Корзина</h1>
                <div style={{marginBottom:'20px'}}>
                    <pre><b style={{fontSize:'20px'}}>Всего товаров:  {basketProducts.length}шт.</b></pre>
                    <br/>
                    <pre><b style={{fontSize:'20px'}}>Общая стоимость:  {summary}руб</b></pre>
                </div>
                {renderProducts.length!=0 ? renderProducts.map((e) => {
                        if (BRAND && CAT && SIZE && MAT) {
                            return (
                                <BasketElement key={e.id} e={e} brands={BRAND} categories={CAT} sizes={SIZE}
                                               materials={MAT}/>
                            )
                        }
                    }
                    )
                    :
                    <div style={{height:'400px', width:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', marginTop:'150px'}}>
                        <h1 style={{color:'white'}}>В вашей корзине пусто</h1>
                    </div>
                }

            </div>
        );

};

export default Basket;