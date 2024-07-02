import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import FootBar from './components/FootBar'
import './App.css';
import './Special.scss';

import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import FixedFootBar from "./components/FixedFootBar";



const App = observer(()=>{
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        check().then((e)=> {
            user.setUser(user)
            user.setIsAuth(true)
        }).catch(e=>{
            console.log('Unauthorization')
        }).finally(()=>setLoading(false))
    }, [])

    if(loading){
        return (
            <Spinner className='spin' animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

  return(
        <>
          {/*<BrowserRouter>*/}

              <AppRouter/>

              {/*<video autoPlay loop muted className="bgvideo">*/}
              {/*    <source src={video} type="video/mp4"/>*/}
              {/*</video>*/}
              <FixedFootBar/>

              {/*<video autoPlay loop muted className="bgvideo">*/}
              {/*    <source src={video1} type="video/mp4"/>*/}
              {/*</video>*/}
              <NavBar/>
              <div style={{height:'150px', width:'100%', position:'relative', bottom:'0',marginBottom:'350px'}}></div>
          {/*</BrowserRouter>*/}
        </>

  )
})

export default App;
