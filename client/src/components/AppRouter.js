import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes} from "../routes";
import {publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from '../index';
import {observer} from "mobx-react-lite";
import FootBar from "./FootBar";

const AppRouter = observer(() => {
    const {user} = useContext(Context);

    return (
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component})=>
                        <Route key={path} exact path={path} element={<Component/>} />

                )}
                {publicRoutes.map(({path, Component})=>
                        <Route key={path} path={path} element={<Component/>} exact/>
                )}
            </Routes>
    );
});
export default AppRouter;