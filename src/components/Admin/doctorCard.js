import React, { Component } from 'react';
import {Card,Button,Modal} from 'react-bootstrap';
import { db } from '../../firebase';
import './Admin.css';

class DoctorCard extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
		};
         }

         handleClose() {
            this.setState({ show: false });
        }

        handleShow() {
            this.setState({ show: true });
        }

        verify=()=>{
            db.collection('vet').doc(this.props.vid).update({
                verified: true
            }).then(()=> window.location.reload())
        }
    render() { 
        const {data}= this.props
        const lol="qwerty"
        return ( 
            <div className="card-verify">
                <Card className="verify_card">
                    <div className="row">
                        <div className="col-12 col-sm-4 align-self-center mt-3">
                            <Card.Img className="card_img" src="https://firebasestorage.googleapis.com/v0/b/petmet-268a4.appspot.com/o/itemImages%2Fimage%203.png?alt=media&token=e46c6b3a-2110-46c1-8902-4b2b838660d9" />
                        </div>
                        <div className="col-12 col-sm-8 mb-4 mb-xl-3">
                            <Card.Body>
                                <Card.Title>{data.Name}</Card.Title>
                                <Card.Text>
                                    <ul className="list-unstyled">
                                        <li>Address: {data.Address}<br /> </li>
                                        <li>Qualification: {data.Qualification}</li>
                                    </ul>
                                </Card.Text>
                                <button className="mr-1 btn-sm pink_btn btn-card-1" onClick={this.verify}>Verify</button>
                                <button className="mr-1 btn-sm blue_btn btn-card-2" onClick={this.handleShow}>View Profile</button>
                            </Card.Body>
                        </div>
                    </div>
                </Card>

                <Modal show={this.state.show} onHide={this.handleClose} size="lg" className="modal" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Name of Vet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row justify-content-center">
                            <div className="col-12 col-md-5 offset-sm-1">
                                <img src="https://firebasestorage.googleapis.com/v0/b/petmet-268a4.appspot.com/o/itemImages%2Fimage%203.png?alt=media&token=e46c6b3a-2110-46c1-8902-4b2b838660d9" className="profile_img" />
                                <p style={{color: "#36A9CC"}} className="mt-2">Verified</p>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="row mt-5 mt-sm-2">
                                <strong className="col-6 col-sm-5 col-lg-4">Name:</strong>
                                    <p className="col">{data.Name}</p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Address:</strong>
                                    <p className="col">{data.Address}</p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">City:</strong>
                                <p className="col">{data.city}</p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">State:</strong>
                                <p className="col">{data.state}</p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Mobile No:</strong>
                                <p className="col">{data.phone}</p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Qualification:</strong>
                                <p className="col">{data.Qualification}</p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Experience:</strong>
                                <p className="col">{data.experience}</p>
                                </div>
                                <div className="row">
                                <strong className="col-6 col-sm-5 col-lg-4">Achievements:</strong>
                                <p className="col">{data.Achievements}</p>
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
 
export default DoctorCard;