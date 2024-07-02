import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button, Form} from "react-bootstrap";
import {createBrand, createColors} from "../../http/deviceAPI";

import { ColorPicker, useColor } from "react-color-palette";
import "../../../node_modules/react-color-palette/dist/css/rcp.css";

const CreateColor = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const [color, setColor] = useColor("hex", "#121212");

    const addColor=()=>{
        const formdata= new FormData()
        formdata.append('name', value)
        formdata.append('hex', color.hex)
        createColors(formdata).then(e=>{
            setValue('')
            onHide()
        })
    }
    return (
        <div >

            <Modal
                style={{marginTop:'180px'}}
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавить бренд</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                        placeholder={'Введите название цвета'}
                    />
                </Modal.Body>

                <Modal.Body>
                    <ColorPicker width={456} height={228}
                                 color={color}
                                 onChange={setColor} hideHSV dark />;
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addColor}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default CreateColor;