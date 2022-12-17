import React,{useState} from 'react';
import {Card,Modal} from 'react-bootstrap';

const OutCards = (props) => {
    const {data}= props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return ( 
        <div>
                <Card className="mb-2">
                            <Card.Body>
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className="list-unstyled">
                                                <li><strong>Product Name: </strong>{data.name} <br/></li>
                                                <li><strong>Category: </strong>{data.category} <br/></li>
                                            </ul>
                                        </div>
                                    </div>
                                <div className="row justify-content-center">
                                <button className="btn-sm pink_btn mr-2" onClick={handleShow}>View Product</button>
                                <button className="btn-sm blue_btn">Add Product</button>
                                </div>
                            </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                        <ul className="list-unstyled">
                            {/*
                            <li><strong>Product Name: </strong>Biscuits <br/></li>
                            <li><strong>Product Category: </strong>Dog Food <br /> </li>
                            <li><strong>Cost: </strong>Rs. 3000 <br/></li>
                            <li><strong>Quantity: </strong>10 <br /></li>*/ }
                            
                        </ul>
                        <li><strong>Product Id: </strong>{data.key} <br/></li>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn-sm pink_btn" onClick={handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
        </div>
     );
}
 
export default OutCards;