import React, {useContext, useEffect, useState} from 'react';
import {fetchUserOrder} from "../http/orderAPI";
import {jwtDecode} from "jwt-decode";
import {Context} from '../index'
import BasketElement from "../components/BasketElement";
import {toJS} from "mobx";
import {fetchBrand, fetchCategory, fetchMaterial, fetchSize} from "../http/deviceAPI";
import OrderElement from '../components/orderElement'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {CONFIRM_ROUTE, LOGIN_ROUTE, NEWPASS_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Avatar from "react-avatar-edit";
import {login, registration} from "../http/userAPI";

const User = () => {
    const {product} = useContext(Context)
    const history = useNavigate()
    let user
    let user_token
    if(localStorage.getItem('token')) {
        user_token = localStorage.getItem('token')
        user = jwtDecode(user_token)
    }

    const [orders,setOrd]=useState(0)
    const [BRAND, setBRAND] =useState(0)
    const [CAT, setCAT] = useState(0)
    const [SIZE, setSIZE] = useState(0)
    const [MAT, setMAT] = useState(0)

    let renderOrders = []
    useEffect(()=>{

        if(localStorage.getItem('token')) {
            fetchUserOrder(user_token).then((e) => {
                //console.log(e)
                setOrd(e)
            })
        }
    },[])
    if(orders!=0){
        orders.forEach(a=>{
            renderOrders.push(a.product)
        })
    }
    const onClose = ()=>{
        setPreview(null)
    }
    const onCrop = (view)=>{
        setPreview(view)
    }
    const click = async()=>{
        try{
            let data
            if(isLogin){
                data = await login(email, password).then(()=>{
                    history(SHOP_ROUTE)
                    window.location.reload()
                }).catch(e=>{
                    alert(e.response.data.message)
                })
            }else{
                const formData = new FormData()
                formData.append('email', email)
                formData.append('password', password)
                formData.append('name', name)
                formData.append('img', img)
                data = await registration(formData).then(e=>{
                    history(CONFIRM_ROUTE)
                }).catch(e=>{
                    alert(e.response.data.message)
                    user.setIsAuth(false)
                    return
                })
            }

        }
        catch(e){
            alert(e)
        }
    }
    const location = useLocation();
    const isLogin = location.pathname===LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [img,setFile] = useState(null)

    const [src, setSrc] = useState(null)
    const [preview, setPreview] = useState(null)
    return (
        <div style={{minHeight:'600px', marginTop:'80px'}}>
            {localStorage.getItem('token') ?
                    <div style={{width:'100%', height:'auto', color:'white', marginTop:'30px',  justifyContent:'space-between', marginBottom:'30px'}} className="prof_inf_ord">
                        <h1 style={{marginBottom:'50px'}} id='vash'>Ваш профиль</h1>
                        <div className="avatar">
                            <div style={{ display:'flex'}} className="avatar_1">
                                <img style={{width:'100px', height:'100px', borderRadius:'50%'}} src={process.env.REACT_APP_BASE_URL+jwtDecode(user_token).img} alt=""/>
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}} className="names">
                                    <h1 className="nme" style={{fontSize:'35px', marginLeft:'10px'}} >{user.name}</h1>

                                </div>
                            </div>
                            {user.email.length<=17 ?
                                <>
                                    <h1 id="mail_id" style={{fontSize:'35px'}} >{'Почта: '}<br/></h1>
                                    <p>{user.email}</p>
                                </>
                                :
                                // <h1 id="mail_id" style={{fontSize:'35px'}} >{'Почта: '+user.email.slice(0, 15)+'...'}</h1>
                                <>
                                    <h1 id="mail_id" style={{fontSize:'35px'}} >{'Почта: '}<br style={{marginBottom:'20px'}}/></h1>
                                    <p style={{fontSize:'23px',marginTop:'10px'}}>{user.email}</p>
                                </>
                            }
                        </div>

                        <div style={{borderRadius:'30px', height:'auto'}} className="user_orders">
                            <h1 id="ords" style={{fontSize:'25px'}}>Заказы:</h1>
                            {renderOrders.length!=0 ?renderOrders.map(a=>{
                                if (BRAND && CAT && SIZE && MAT) {
                                    return (
                                        <OrderElement key={a.id} e={a} materials={MAT} sizes={SIZE} categories={CAT}
                                                      brands={BRAND}/>
                                    )
                                }
                                })

                                :
                                <p style={{textAlign:'center', marginTop:'50px'}}>Заказов пока что нет</p>
                            }
                            <div style={{clear:'both', height:'30px'}}></div>
                        </div>
                    </div>

                :
                <>
                    <div style={{height:'auto', paddingBottom:'150px'}} className='reg_wind'>
                        <h1 style={{marginTop:'30px'}}>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
                        <form style={{display:'flex', flexDirection: 'column'}} action="">
                            <input style={{marginTop:'30px', borderRadius:'10px'}} placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} className='frm' type="text"/>
                            <input style={{marginTop:'30px', borderRadius:'10px'}} placeholder='пароль' value={password} onChange={e=>setPassword(e.target.value)}  className='frm' type="password"/>
                            {!isLogin &&
                                <input style={{marginTop:'30px', borderRadius:'10px'}} placeholder='Введите имя' value={name} onChange={e=>setName(e.target.value)} className='frm' type="text"/>
                            }
                        </form>
                        {isLogin?
                            <>
                                <b style={{marginTop:'20px'}}><NavLink style={{textDecoration:'none'}} to={NEWPASS_ROUTE}>Забыли пароль?</NavLink></b>
                                <p style={{marginTop:'30px'}}>Нет аккаунта? <NavLink style={{textDecoration:'none'}} to={REGISTRATION_ROUTE}><b>Зарегистрируйтесь!</b></NavLink> </p>
                            </>
                            :
                            <>

                                <div className='avatar_'>
                                    <h1 style={{fontSize:'25px'}}>Выберите фото:</h1>
                                    <Avatar
                                        width={200}
                                        height={200}
                                        onCrop={onCrop}
                                        onClose={onClose}
                                        src={src}
                                    />
                                    {preview && <img style={{marginLeft:'auto', marginRight:'auto', height:'100px', width:'100px', marginTop:'20px'}} src={preview}/>}
                                    <p style={{marginLeft:'auto', marginRight:'auto', fontSize:'35px'}}>{name}</p>
                                </div>
                            </>
                        }
                        <button style={{marginTop:'30px'}} onClick={click} className='regBut'>{isLogin? 'Войти' : 'Регистрация'}</button>
                        {!isLogin &&
                            <b style={{marginTop:'20px', fontSize:'20px'}}>Есть аккаунт? <NavLink style={{textDecoration:'none'}} to={LOGIN_ROUTE}>Войдите!</NavLink></b>
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default User;