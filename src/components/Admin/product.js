import React, { Component } from 'react';
import {Card,Modal} from 'react-bootstrap';
import './Admin.css';

class Product extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            show: false,
         }
    }

    handleClose=()=> {
        this.setState({ show: false });
    }

    handleShow=()=> {
        this.setState({ show: true });
    }

    render() { 
        return ( 
            <div className="card-verify">
                <Card className="verify_card">
                    <div className="row">
                        <div className="col-12 col-sm-4 align-self-center mt-3">
                            <Card.Img className="card_img" src={this.props.data.url} />
                        </div>
                        <div className="col-12 col-sm-8 mb-4 mb-xl-2">
                            <Card.Body>
                                <Card.Title>{this.props.data.name}</Card.Title>

                                    <ul className="list-unstyled">
                                        <li>{this.props.data.cost}<br /> </li>
                                        <li>{this.props.data.quantity}<br /></li>
                                        <li>{this.props.data.category}<br /></li>
                                    </ul>
                                <button className="mr-1 btn-sm blue_btn btn-card-2-1" onClick={this.handleShow}>View</button>
                                {/*<button className="mr-1 btn-sm pink_btn btn-card-1-1" onClick={this.verify}>Edit</button>*/ }
                                
                            </Card.Body>
                        </div>
                    </div>
                </Card>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg" className="modal" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Name of Vet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container mb-3">
                            <div className="row justify-content-center">
                            <div className="col-12 col-md-5 offset-sm-1">
                                <img src="https://firebasestorage.googleapis.com/v0/b/petmet-268a4.appspot.com/o/itemImages%2Fimage%203.png?alt=media&token=e46c6b3a-2110-46c1-8902-4b2b838660d9" className="profile_img" />
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="row mt-5 mt-sm-2">
                                <strong className="col-6 col-sm-5 col-lg-4">Name: {this.props.data.name} </strong>
                                    <p className="col"></p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Description: {this.props.data.description} </strong>
                                    <p className="col"></p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Cost: {this.props.data.cost} </strong>
                                <p className="col"></p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Category: {this.props.data.category} </strong>
                                <p className="col"></p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Size: {this.props.data.size} </strong>
                                <p className="col"></p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Quantity: {this.props.data.quantity} </strong>
                                <p className="col"></p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Ingredients: {this.props.data.ingridients} </strong>
                                <p className="col"></p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Additional Information: {this.props.data.addInfo} </strong>
                                <p className="col"></p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            
         );
    }
}
 
export default Product;