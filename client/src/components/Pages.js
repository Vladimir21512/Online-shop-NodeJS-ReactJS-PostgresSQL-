import React, {useContext} from 'react';
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const Pages = observer(() => {
    const {product} = useContext(Context)
    const pagesCount= Math.ceil(product.totalCount/product.limit)
    const pages = []
    for (let i =0;i<pagesCount;i++){
        pages.push(i+1)
    }
    return (
        <div style={{width:'100%'}}>
            <Pagination>
                {(pages.length>3 && pages.lenght!=4 && pages.length!=5) ?
                    <>
                        {product.page<4 ?
                            <>
                            <Pagination.Item onClick={()=>product.setPage(1)} active={product.page===1}>1</Pagination.Item>
                            <Pagination.Item onClick={()=>product.setPage(2)} active={product.page===2}>2</Pagination.Item>
                            <Pagination.Item onClick={()=>product.setPage(3)} active={product.page===3}>3</Pagination.Item>
                            <Pagination.Item onClick={()=>product.setPage(4)} active={product.page===4}>4</Pagination.Item>
                            <Pagination.Item onClick={()=>product.setPage(pages[pages.length-1])} active={product.page===pages[pages.length-1]}>{pages[pages.length-1]}</Pagination.Item>
                            </>
                            :
                            <>
                                <Pagination.Item onClick={()=>product.setPage(1)} active={product.page===1}>1</Pagination.Item>
                                <Pagination.Item onClick={()=>product.setPage(pages[product.page-3])} active={product.page===pages[product.page-3]}>{pages[product.page-3]}</Pagination.Item>
                                <Pagination.Item onClick={()=>product.setPage(pages[product.page-2])} active={product.page===pages[product.page-2]}>{pages[product.page-2]}</Pagination.Item>
                                <Pagination.Item onClick={()=>product.setPage(pages[product.page-1])} active={product.page===pages[product.page-1]}>{pages[product.page-1]}</Pagination.Item>
                                {pages[product.page] &&
                                    <Pagination.Item onClick={()=>product.setPage(pages[product.page])} active={product.page===pages[product.page]}>{pages[product.page]}</Pagination.Item>
                                }
                            </>
                        }
                    </>
                    :
                    <>
                        {pages.map(e=>{
                            return(
                            <Pagination.Item
                                key={e}
                                active={product.page===e}
                                onClick={()=>product.setPage(e)}
                            >
                                {e}
                            </Pagination.Item>
                            )
                        })
                        }
                    </>
                }
            </Pagination>
        </div>
    );
});

export default Pages;