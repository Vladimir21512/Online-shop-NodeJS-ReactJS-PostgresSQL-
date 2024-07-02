import React, {useContext} from 'react';
import {Context} from "../index";
import DeviceItem from "../components/DeviceItem";
import {toJS} from "mobx";
import {Button} from "react-bootstrap";
import {SHOP_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const SearchPage = () => {
    const {product} = useContext(Context)
    const history = useNavigate()
    const resetSrc = ()=>{
        product.setSearchBool(false)
        product.setProducts(product.First)
        product.setPage(1)
        history(SHOP_ROUTE)
    }
    return (
        <div style={{marginTop:'40px'}}>
            <Button onClick={()=> resetSrc()} className='srcbut' style={{borderRadius:'30px', height:'50px'}}>
                <div className="cls"></div>
                Отменить поиск
            </Button>
            <h1 style={{marginTop:'40px', marginBottom:'40px'}}>Результаты поиска:</h1>

            <div style={{width:'100%'}} className="ProdView">
                {product.searchResult.map(e=> {
                    return(
                        <DeviceItem key={e.id} device={e}></DeviceItem>
                    )
                    }
                    )
                }
            </div>
        </div>
    );
};

export default SearchPage;