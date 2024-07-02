import React, {createContext} from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";

import { createRoot } from "react-dom/client";
import FootBar from "./components/FootBar";
import {BrowserRouter} from "react-router-dom";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

export const Context = createContext(null)
root.render(

    <Context.Provider value={{
        user: new UserStore(),
        product: new ProductStore()
    }}>
        <BrowserRouter>
        <div className="container">
            <App/>
        </div>

        <FootBar/>
        </BrowserRouter>
    </Context.Provider>
);

