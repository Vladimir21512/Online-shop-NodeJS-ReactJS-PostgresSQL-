import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createProduct, fetchBrand, fetchCategory, fetchMaterial, fetchProduct, fetchSize} from "../../http/deviceAPI";
import {toJS} from "mobx";

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context)

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [desc,setDesc] = useState('')
    const [file,setFile] = useState(null)
    // const [file1,setFile1] = useState(null)
    // const [file2,setFile2] = useState(null)
    // const [file3,setFile3] = useState(null)
    // const [file4,setFile4] = useState(null)
    // const [file5,setFile5] = useState(null)
    // const [file6,setFile6] = useState(null)
    // const [file7,setFile7] = useState(null)
    // const [file8,setFile8] = useState(null)
    // const [file9,setFile9] = useState(null)
    // const [file10,setFile10] = useState(null)

    const [info_1, setInfo] = useState([])

    const addInfo = () => {
        console.log(info_1)
        setInfo([...info_1, {color: '', hex:'', image_1: '', image_2: '', image_3: '', image_4: '', image_5: '', sizes: '', number:Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info_1.filter(i => i.number !== number))
    }
    const changeColorInfo = (value, HEX,number) => {
        setInfo(info_1.map(i => i.number === number ? {...i, color: value, hex:HEX} : i))
    }
    const changeImageInfo_1 = (value, number) => {
        setInfo(info_1.map(i => i.number === number ? {...i, image_1: value} : i))
    }
    const changeImageInfo_2 = (value, number) => {
        setInfo(info_1.map(i => i.number === number ? {...i, image_2: value} : i))
    }
    const changeImageInfo_3 = (value, number) => {
        setInfo(info_1.map(i => i.number === number ? {...i, image_3: value} : i))
    }
    const changeImageInfo_4 = (value, number) => {
        setInfo(info_1.map(i => i.number === number ? {...i, image_4: value} : i))
    }
    const changeImageInfo_5 = (value, number) => {
        setInfo(info_1.map(i => i.number === number ? {...i, image_5: value} : i))
    }

    const changeSizeInfo = (value, number) => {
        let tmp_bool = false
        info_1.forEach(e=>{
            if(e.number==number){
                if(e.sizes==''){
                    setInfo(info_1.map(i => i.number === number ? {...i, sizes: value} : i))
                }
                else{
                    setInfo(info_1.map(i => i.number === number ? {...i, sizes: i.sizes+','+value} : i))
                }
            }
        })
        console.log(info_1)
    }

    const [type, setType] = useState('')
    const selectFile = e=>{
        setFile(e.target.files[0])
    }
    // const selectFile1 = e=>{
    //     setFile1(e.target.files[0])
    // }
    // const selectFile2 = e=>{
    //     setFile2(e.target.files[0])
    // }
    // const selectFile3 = e=>{
    //     setFile3(e.target.files[0])
    // }
    // const selectFile4 = e=>{
    //     setFile4(e.target.files[0])
    // }
    // const selectFile5 = e=>{
    //     setFile5(e.target.files[0])
    // }
    // const selectFile6 = e=>{
    //     setFile6(e.target.files[0])
    // }
    // const selectFile7 = e=>{
    //     setFile7(e.target.files[0])
    // }
    // const selectFile8 = e=>{
    //     setFile8(e.target.files[0])
    // }
    // const selectFile9 = e=>{
    //     setFile9(e.target.files[0])
    // }
    // const selectFile10 = e=>{
    //     setFile10(e.target.files[0])
    // }
    const addProduct=(info)=>{
        const formdata = new FormData()
        let TYPE
        if(type=='Обычный'){
            TYPE = 'default'
        }
        else if(type=='Новинки'){
            TYPE = 'premium'
        }
        else{
            TYPE = ''
        }
        if(!toJS(product.selectedBrand).id){
            return alert('вы не выбрали бренд')
        }
        // if(!toJS(product.SelectedSize).id){
        //     return alert('вы не выбрали размер')
        // }
        if(!toJS(product.SelectedMaterial).id){
            return alert('вы не выбрали сезон')
        }
        if(!toJS(product.SelectedCategory).id){
            return alert('вы не выбрали категорию')
        }
        formdata.append('name', name)
        formdata.append('img', file)
        // formdata.append('img1', file1)
        // formdata.append('img2', file2)
        // formdata.append('img3', file3)
        // formdata.append('img4', file4)
        // formdata.append('img5', file5)
        // formdata.append('img6', file6)
        // formdata.append('img7', file7)
        // formdata.append('img8', file8)
        // formdata.append('img9', file9)
        // formdata.append('img10', file10)

        formdata.append('description', desc)
        formdata.append('price', price)

        formdata.append('brandId', product.selectedBrand.id)
        formdata.append('categoryId', product.SelectedCategory.id)
        // formdata.append('sizeId', product.SelectedSize.id)
        formdata.append('materialId', product.SelectedMaterial.id)
        formdata.append('info_1', JSON.stringify(info_1))
        formdata.append('type', 'default')
        if(product.SelectedSex=='Мужчинам'){
            formdata.append('sexId', 1)
        }
        else if(product.SelectedSex=='Женщинам'){
            formdata.append('sexId', 2)
        }
        else if(product.SelectedSex=='Унисекс'){
            formdata.append('sexId', 3)
        }
        else{
            formdata.append('sexId', 3)
        }
        console.log(info_1)
        let iter = 1

        //проходимся по каждому цвету
        for (var pair of info_1){
            if(pair.image_1!=''){
                formdata.append('color'+iter+'_img1', pair.image_1)
            }
            if(pair.image_2!=''){
                formdata.append('color'+iter+'_img2', pair.image_2)
            }
            if(pair.image_3!=''){
                formdata.append('color'+iter+'_img3', pair.image_3)
            }
            if(pair.image_4!=''){
                formdata.append('color'+iter+'_img4', pair.image_4)
            }
            if(pair.image_5!=''){
                formdata.append('color'+iter+'_img5', pair.image_5)
            }
            formdata.append('color'+iter+'_name', pair.color)
            formdata.append('color'+iter+'_sizes', pair.sizes)
            iter+=1
        }
        // for (var pair of formdata.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        //     // if(pair[0]=='info_1'){
        //     //     for (var key in JSON.stringify(pair[1])) {
        //     //         if (pair[1].hasOwnProperty(key)) {
        //     //             console.log(key + " -> " + pair[1][key]);
        //     //         }
        //     //     }
        //     // }
        // }
        createProduct(formdata).then(data=> {
            setFile(null)
            // setFile1(null)
            // setFile2(null)
            // setFile3(null)
            // setFile4(null)
            // setFile5(null)
            // setFile6(null)
            // setFile7(null)
            // setFile8(null)
            // setFile9(null)
            // setFile10(null)
            onHide()
        }).catch(e=> console.log(e))
    }

    useEffect(()=>{
        fetchCategory().then(data=> {
            product.setCategories(data.categories)
        })
        fetchBrand().then(data=>{
            product.setBrands(data.brands)
        })
        fetchSize().then(data=>{
            product.setSizes(data.sizes)
        })
        fetchMaterial().then(data=>{
            product.setMaterials(data.materials)
        })
        fetchProduct().then(data=>{
            product.setProducts(data.rows)
        })
    },[])
    const onHide_1=()=>{
        setFile(null)
        // setFile1(null)
        // setFile2(null)
        // setFile3(null)
        // setFile4(null)
        // setFile5(null)
        // setFile6(null)
        // setFile7(null)
        // setFile8(null)
        // setFile9(null)
        // setFile10(null)
    }
    return (
        <div>
            <Modal
                show={show}
                onHide={()=>{
                    onHide()
                    onHide_1()
                }}
                size = 'lg'
                style={{marginTop:'150px', height: '536px', overflowY:'auto'}}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавить продукт</Modal.Title>
                </Modal.Header>
                <Modal.Body id='product_body'>
                    <Form>

                        {/*<Dropdown className='mt-3 mt-2'>*/}
                        {/*    <Dropdown.Toggle>*/}
                        {/*        {type || 'Выберите тип товара'}*/}
                        {/*    </Dropdown.Toggle>*/}
                        {/*    <Dropdown.Menu>*/}
                        {/*        <Dropdown.Item onClick={()=> setType('Обычный')}>Обычный</Dropdown.Item>*/}
                        {/*        <Dropdown.Item onClick={()=> setType('Для срочной продажи')}>Для срочной продажи</Dropdown.Item>*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}

                        <Dropdown className='mt-3 mt-2'>

                            <Dropdown.Toggle>
                                {product.SelectedCategory.name||'Выберите категорию'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{height:'300px', overflowY:'scroll'}}>
                                {product.categories.map((item)=>{

                                        return (<Dropdown.Item onClick={()=> product.setSelectedCategory(item)} key={item.id}>{item.name}</Dropdown.Item>)
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className='mt-3 mt-2'>

                            <Dropdown.Toggle>
                                {product.SelectedSex || 'Выберите категорию'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{height:'300px', overflowY:'scroll'}}>

                                <Dropdown.Item onClick={()=> product.setSelectedSex('Мужчинам')} >
                                    Мужчинам
                                </Dropdown.Item>
                                <Dropdown.Item onClick={()=> product.setSelectedSex('Женщинам')} >
                                    Женщинам
                                </Dropdown.Item>
                                <Dropdown.Item onClick={()=> product.setSelectedSex('Унисекс')} >
                                    Унисекс
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className='mt-3 mt-2'>
                            <Dropdown.Toggle>

                                {product.selectedBrand.name||'Выберите бренд'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{height:'300px', overflowY:'scroll'}} >
                                {product.brands.map((brand)=>{

                                    return (<Dropdown.Item onClick={()=>product.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>)
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/*<Dropdown className='mt-3 mt-2'>*/}
                        {/*    <Dropdown.Toggle>*/}
                        {/*        {product.SelectedSize.name||'Выберите размер'}*/}
                        {/*    </Dropdown.Toggle>*/}
                        {/*    <Dropdown.Menu>*/}
                        {/*        {product.sizes.map((size)=>{*/}

                        {/*            return (<Dropdown.Item onClick={()=>product.setSelectedSize(size)} key={size.id}>{size.name}</Dropdown.Item>)*/}
                        {/*        })}*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}

                        <Dropdown className='mt-3 mt-2'>
                            <Dropdown.Toggle>
                                {product.SelectedMaterial.name||'Выберите время года'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{height:'300px', overflowY:'scroll'}}>
                                {product.materials.map((mat)=>{

                                    return (<Dropdown.Item onClick={()=> product.setSelectedMaterial(mat)} key={mat.id}>{mat.name}</Dropdown.Item>)
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control className='mt-3'
                                      onChange={(e)=> setName(e.target.value)}
                            placeholder='Введите названия товара'
                        />
                        <Form.Control className='mt-3'
                                      onChange={(e)=> setPrice(Number(e.target.value))}
                            placeholder='Введите цену товара'
                            type='number'
                        />
                        <Form.Control className='mt-3'
                                      onChange={(e)=> setDesc(e.target.value)}
                                      placeholder='Введите описание товара'
                        />

                        <Form.Control className='mt-3'
                                      onChange={(e)=> selectFile(e)}
                                      placeholder='Введите описание товара'
                                      type='file'
                        />



                        {info_1.map(i =>
                            <div style={{backgroundColor:'black'}} className="new_admin">
                                <Dropdown className='mt-3 mt-2'>
                                    <Dropdown.Toggle>

                                        Выбрать цвет
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{height:'300px', overflowY:'scroll'}}>
                                        {product.colors.map((brand)=>{

                                            return (<Dropdown.Item style={{display:'flex', alignItems:'center', justifyContent:'space-around'}} onClick={()=>{changeColorInfo(brand.name, brand.hex,i.number)}} key={brand.id}>
                                                {brand.name}
                                                <div style={{height:'30px', width:'30px', backgroundColor:brand.hex}}></div>
                                            </Dropdown.Item>)
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown className='mt-3 mt-2'>
                                    <Dropdown.Toggle>

                                        Добавить размеры
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{height:'300px', overflowY:'scroll'}}>
                                        {product.sizes.map((brand)=>{

                                            return (<Dropdown.Item style={{display:'flex', alignItems:'center', justifyContent:'space-around'}} onClick={()=>{changeSizeInfo(brand.name, i.number)}} key={brand.id}>
                                                {brand.name}
                                                <div style={{height:'30px', width:'30px', backgroundColor:brand.hex}}></div>
                                            </Dropdown.Item>)
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div style={{display:'flex', marginTop:'20px', marginBottom:'20px', marginLeft:'15px'}}>
                                    <pre>Цвет:{i.color}</pre>
                                    <div style={{height:'35px', width:'35px', backgroundColor:i.hex, marginLeft:'15px'}}></div>
                                </div>
                                <div style={{display:'flex', marginTop:'20px', marginBottom:'20px', marginLeft:'15px'}}>
                                    <pre>Размеры:  {i.sizes}</pre>

                                </div>
                                    <Form.Control
                                        style={{marginBottom:'15px'}}
                                        onChange={(e)=>changeImageInfo_1(e.target.files[0], i.number)}
                                        type='file'
                                        placeholder="Загрузите картинку"
                                    />
                                    <Form.Control
                                        style={{marginBottom:'15px'}}
                                        onChange={(e)=>changeImageInfo_2(e.target.files[0], i.number)}
                                        type='file'
                                        placeholder="Загрузите картинку"
                                    />
                                    <Form.Control
                                        style={{marginBottom:'15px'}}
                                        onChange={(e)=>changeImageInfo_3(e.target.files[0], i.number)}
                                        type='file'
                                        placeholder="Загрузите картинку"
                                    />
                                    <Form.Control
                                        style={{marginBottom:'15px'}}
                                        onChange={(e)=>changeImageInfo_4(e.target.files[0], i.number)}
                                        type='file'
                                        placeholder="Загрузите картинку"
                                    />
                                    <Form.Control
                                        style={{marginBottom:'15px'}}
                                        onChange={(e)=>changeImageInfo_5(e.target.files[0], i.number)}
                                        type='file'
                                        placeholder="Загрузите картинку"
                                    />

                                    <Button
                                        style={{marginLeft:'20px', marginBottom:'20px'}}
                                        onClick={() => removeInfo(i.number)}
                                        variant={"danger"}
                                    >
                                        Удалить
                                    </Button>
                            </div>

                        )}
                        <Button
                            style={{marginTop:'15px'}}
                            variant={"outline-dark"}
                            onClick={addInfo}
                        >
                            Добавить цвет
                        </Button>
                        {/*<Dropdown className='mt-3 mt-2'>*/}
                        {/*    <Dropdown.Toggle>*/}

                        {/*        Добавить цвет*/}
                        {/*    </Dropdown.Toggle>*/}
                        {/*    <Dropdown.Menu>*/}
                        {/*        {product.colors.map((brand)=>{*/}

                        {/*            return (<Dropdown.Item style={{display:'flex', alignItems:'center', justifyContent:'space-around'}} onClick={()=>{*/}
                        {/*                addNewWind(brand.name, brand.hex)}} key={brand.id}>*/}
                        {/*                {brand.name}*/}
                        {/*                <div style={{height:'30px', width:'30px', backgroundColor:brand.hex}}></div>*/}
                        {/*            </Dropdown.Item>)*/}
                        {/*        })}*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                        {/*<Form.Control*/}
                        {/*    className='mt-3'*/}
                        {/*    onChange={selectFile}*/}
                        {/*    placeholder='Загрузите картинку товара'*/}
                        {/*    type='file'*/}
                        {/*    style={{backgroundColor:'red'}}*/}
                        {/*/>*/}

                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile1}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}
                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile2}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}
                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile3}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}
                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile4}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}
                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile5}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}
                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile6}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}
                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile7}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}
                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile8}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}
                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile9}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}
                        {/*<Form.Control className='mt-3'*/}
                        {/*              onChange={selectFile10}*/}
                        {/*              placeholder='Загрузите картинку товара'*/}
                        {/*              type='file'*/}
                        {/*/>*/}

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addProduct}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateProduct;