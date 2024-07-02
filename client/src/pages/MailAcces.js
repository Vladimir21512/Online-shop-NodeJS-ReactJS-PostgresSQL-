import React, {useEffect} from 'react';
import {LOGIN_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";

const MailAccess = () => {
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            console.log('Отсутствует токен')
        }
        else{
            localStorage.removeItem('token')
        }
    },[])
    return (
        <div style={{marginTop:'200px'}}>
            {/*{localStorage.getItem('token') ?*/}
            {/*    <>*/}
            {/*        <h1 style={{textAlign:'center'}}>Вы подтвердили свою почту!</h1>*/}
            {/*        <NavLink to={LOGIN_ROUTE}>Авторизуйтесь</NavLink>*/}
            {/*    </>*/}
            {/*    :*/}
            {/*    <h1>Вы не авторизованы</h1>*/}
            {/*}*/}
            <h1 style={{textAlign:'center'}}>Вы подтвердили свой аккаунт!</h1>
            <NavLink style={{fontSize:'30px', width:'100%', textAlign:'center', display:'block', marginTop:'20px'}} to={LOGIN_ROUTE}>Авторизуйтесь</NavLink>
        </div>
    );
};

export default MailAccess;