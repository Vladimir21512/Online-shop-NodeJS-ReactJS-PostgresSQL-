import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {createCategory, createMaterial} from "../../http/deviceAPI";
import {Context} from "../../index";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";

const CreateMaterial = observer(({show, onHide}) => {
    const [value, setValue] = useState('')
    const {product} = useContext(Context)
    const addMat = ()=>{
        createMaterial({name: value}).then((data) => {
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
                    <Modal.Title>Добавить время года</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                        placeholder={'Введите название времени года'}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addMat}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateMaterial;