import React, { Component } from 'react';
import { FaMapMarkerAlt,FaPhoneAlt,FaFacebookSquare,FaInstagram,FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import {AiFillInstagram} from 'react-icons/ai';
import Logo from './pictures/Final Main Logo PET MET.png'
import './Footer.css';
import Play from './pictures/playstore.png';
import App from './pictures/appstore.png';
import Home from "./client/Home";
import {Link} from "react-router-dom";
class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="footer" style={{paddingTop: "2%"}}>
                <div style={{paddingLeft:"6%",paddingRight:"6%"}}>
                    <div className="row">
                        <div className="col-12 col-sm-5">
                            <img className="footer_img" src={Logo} alt="logo"></img>
                            <p className="mt-4"><strong>PETMET SOLUTIONS PRIVATE LIMITED</strong></p>
                            <p className="mt-3">Petmet is the one stop destination for all the needs of your pets.</p>
                            <div className="row ml-4">
                                <span className="facebook social"><FaFacebookSquare /></span>
                                <span className="instagram social"><FaInstagram /></span>
                                <span className="twitter social"><FaTwitter /></span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-3">
                            <h5 style={{color: "#000000",fontWeight: "bold"}}>Useful Links</h5>
                            <ul className="list-unstyled">
                                <Link to ="/"><li>Home</li><br /></Link>
                                <li>About Us</li><br />
                                <li>Contact Us</li><br />
                                <Link to="privacyPolicy"><li>Privacy Policy</li><br /></Link>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-4">
                            <h5 style={{color: "#000000",fontWeight: "bold"}}>Contact Info.</h5>
                            <p><span className="footer_icon"><MdEmail /></span> info.petmet@gmail.com</p>
                            <p><span className="footer_icon"><FaPhoneAlt /></span> +91 90239 16940</p>
                            <div className="row" style={{paddingTop: "40px"}}>
                                <img src={Play} className="mr-2" />
                                <img src={App} />
                            </div>
                        </div>
                    </div>
                    <hr style={{width:"100%"}}></hr>
                    <div className="row justify-content-center">
                        <p style={{color: "#C4C4C4",paddingBottom:"20px"}}>Copyright &copy; 2020 PetMet India, Inc. All rights reserved.</p>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Footer;