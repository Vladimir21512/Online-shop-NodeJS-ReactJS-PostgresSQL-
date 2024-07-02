import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createSize} from "../../http/deviceAPI";

const CreateSize = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addSize = ()=>{
        createSize({name:value}).then((data)=>{
            setValue('')
            onHide()
        })
    }
    return (
        <div>
            <Modal
                style={{marginTop:'180px'}}
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавить размер</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                        placeholder={'Введите название размера'}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addSize}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateSize;