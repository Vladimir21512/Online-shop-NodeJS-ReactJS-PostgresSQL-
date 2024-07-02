import React from 'react';
import {Button} from "react-bootstrap";

const PriceDistance = () => {
    return (
        <div style={{borderStyle:'none'}}>
            <h1 style={{marginTop:'20px', fontSize:'30px'}}>Диапозон цен</h1>
            <input type="text" placeholder='от' className='distance_inp'/>
            <input type="text" placeholder='до'/>

        </div>
    );
};

export default PriceDistance;