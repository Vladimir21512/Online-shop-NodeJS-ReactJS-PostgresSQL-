import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {newPass} from "../http/userAPI";
import {CHECK_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const NewPass = () => {

    const [email, setEmail] = useState()
    const history = useNavigate()

    const [showFilter, setShowFilter] = useState(false);

    const handleCloseFilter = () => setShowFilter(false);
    const handleShowFilter = () => setShowFilter(true);
    const sendPass=()=>{
        const formData = new FormData()
        formData.append('email', email)
        newPass(formData).then(e=>{
            if(e.message){
                handleShowFilter()
            }
            else{
                history(CHECK_ROUTE)
            }
        })
    }
    const handleSubmit = event => {
        event.preventDefault();
        sendPass()
    };
    return (
        <div style={{marginTop:'150px'}}>
            <h1 style={{width:'100%', textAlign:'center'}}>Введите почту от вашего аккаунта:</h1>
            <form style={{textAlign:'center', marginTop:'40px'}} onSubmit={handleSubmit} action="">
                <input onChange={e=>setEmail(e.target.value)} id="new_pass_inp" style={{height:'50px'}} type="text"/>
            </form>
            <div style={{width:'100%', textAlign:'center', marginTop:'40px'}}>
            <Button id="new_pass_but" style={{marginLeft:'auto', marginRight:'auto', height:'40px'}} onClick={sendPass}>Подтвердить</Button>
            </div>


            <Modal
                style={{color: 'white', marginTop:'130px'}}
                show={showFilter}
                onHide={handleCloseFilter}
                backdrop="static"
                keyboard={false}
                className='my-modal'
            >
                <Modal.Header style={{backgroundColor:'#090b0c'}} closeButton>

                </Modal.Header>
                <Modal.Body className='abv'>
                    <p style={{width:'100%', textAlign:'center', color:'black', marginTop:'60px', fontSize:'30px'}}>Пользователь с такой почтой не найден</p>
                </Modal.Body>
                <Modal.Footer style={{border: 'black', height: '155px'}} className='abv'>
                    <Button className='my-button' variant="primary"
                            onClick={()=>{
                                handleCloseFilter()
                            }}>
                        Oк
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default NewPass;