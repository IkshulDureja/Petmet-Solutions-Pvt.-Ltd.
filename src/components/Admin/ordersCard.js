import React,{useState, useEffect} from 'react';
import {Card,Modal} from 'react-bootstrap';
import {db} from '../../firebase'

const Orders = (props) => {
    const {data}= props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{console.log(data)},[])
    const onDelivery=()=>{
        db.collection('All_Orders').doc(data.key).update({
            deliveryStatus: 'done'
        }).then(()=>window.location.reload()).catch(err=> console.log(err))
    }
    return ( 
        <div>
                <Card className="mb-2">
                            <Card.Body>
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className="list-unstyled">
                                                <li><strong>Customer Name: </strong> {data.customerName}<br /> </li>
                                                <li><strong>Order ID: </strong>{data.key} <br/></li>
                                                <li><strong>Total Cost: </strong>{data.total} <br/></li>
                                            </ul>
                                        </div>
                                    </div>
                                <div className="row justify-content-center">
                                <button className="btn-sm pink_btn mr-2" onClick={handleShow}>View Order</button>
                                <button className="btn-sm blue_btn" onClick={onDelivery}>Delivered</button>
                                </div>
                            </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                        <ul className="list-unstyled">
                            <li><strong>Customer Name: </strong> {data.customerName}<br /> </li>
                            <li><strong>Product Name: </strong>{data.name} <br/></li>
                            <li><strong>Total Cost: </strong>{data.total} <br/></li>
                            <li><strong>Address: </strong> Not yet stored<br /></li>
                            <li><strong>Product Category: </strong>{data.category} <br /> </li>
                            <li><strong>Quantity: </strong>{data.numberOfUnits} <br /></li>
                            <li><strong>Delivery Status: </strong>{data.deliveryStatus} <br /></li>
                        </ul>
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
 
export default Orders;
