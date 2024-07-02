import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {createCategory} from "../../http/deviceAPI";
import {Context} from "../../index";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";

const CreateCategory = observer(({show, onHide}) => {
    const [value, setValue] = useState('')
    const {product} = useContext(Context)
    const addCategory = ()=>{
        createCategory({name: value}).then((data) => {
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
                    <Modal.Title>Добавить категорию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                        placeholder={'Введите название категории'}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addCategory}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateCategory;