import React, {useContext} from 'react';
import {Context} from "../index";
import {Button} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {CATALOG_RESULT_ROUTE} from "../utils/consts";
const Catalog = () => {
    const {product} = useContext(Context)
    const history = useNavigate()
    return (
        <div style={{marginTop:'100px'}}>
            <h1>Каталог</h1>
            <div style={{paddingBottom:'500px'}} className="categories_catalog">
                {product.categories.map((E)=>{
                    return(
                        <Button onClick={()=>{
                            history(CATALOG_RESULT_ROUTE+'/'+E.name)
                        }} className="category_button" style={{width:'100%', textAlign:'left', backgroundColor:'#ff000000', borderColor:'gray', marginBottom:"20px"}}>
                            <h1>{E.name}</h1>
                        </Button>
                    )
                })}
            </div>
        </div>
    );
};

export default Catalog;