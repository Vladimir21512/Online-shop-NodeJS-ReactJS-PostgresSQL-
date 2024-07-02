import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CONFIRM_ROUTE, NEWPASS_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import UploadAvatar from "../UploadAvatar";
import {set} from "mobx";
import Avatar from "react-avatar-edit";
import NewPass from "./NewPass";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const history = useNavigate()
    const isLogin = location.pathname===LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [img,setFile] = useState(null)



    const [src, setSrc] = useState(null)
    const [preview, setPreview] = useState(null)
    const onClose = ()=>{
        setPreview(null)
    }
    const onCrop = (view)=>{
        setPreview(view)
    }


    useEffect(()=> {
        if (preview) {
            const url = preview
            const fileName = 'myFile.jpg'

            fetch(url)
                .then(async response => {
                    const contentType = response.headers.get('content-type')
                    const blob = await response.blob()
                    const file = new File([blob], fileName, {contentType})
                    setFile(file)
                })
        }
    },[preview])
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

        }
    }

    return (
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

            <button style={{marginTop:'70px', backgroundColor:'#ffffff'}} onClick={click} className='btnDef regBut'>{isLogin? 'Войти' : 'Регистрация'}</button>
            {isLogin ?
                <>
                    <p style={{marginTop:'30px', fontSize:'20px'}}>Нет аккаунта? <NavLink style={{textDecoration:'none'}} to={REGISTRATION_ROUTE}><b>Зарегистрируйтесь!</b></NavLink> </p>
                    <b style={{marginTop:'20px', fontSize:'20px'}}><NavLink style={{textDecoration:'none'}} to={NEWPASS_ROUTE}>Забыли пароль?</NavLink></b>
                </>
                :
                <b style={{marginTop:'20px', fontSize:'20px'}}>Есть аккаунт? <NavLink style={{textDecoration:'none'}} to={LOGIN_ROUTE}>Войдите!</NavLink></b>
            }

        </div>
    );
});

export default Auth;