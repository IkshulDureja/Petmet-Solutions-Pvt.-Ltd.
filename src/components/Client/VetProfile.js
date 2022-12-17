import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { db, auth } from "../../firebase";
import Doctor from "../pictures/doc.jpg";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { BiClinic } from "react-icons/bi";
import { RiStethoscopeLine, RiChat3Line } from "react-icons/ri";
import { FiVideo } from "react-icons/fi";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Declarations from "./Declarations";
import './VetProfile.css';
import Add from '../pictures/Rectangle 154.png';
import VetConfirmation from './VetConfirmation';
import {Link} from 'react-router-dom';


const home =
  window.location.protocol + "//" + window.location.host + "/" + "Home/";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "100%",
    height: "500px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "25%",
    height: "80%",
  },
  img: {
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
  },
}));

export default function Profile() { const classes = useStyles();
  const [vet, setVet] = useState(null);
  const {subComponent } = useParams();
  const vid = subComponent;
  const [usr, setUsr] = useState(null);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [address, setAddress] = useState(null);
//  const [usr, setUsr] = useState(null); 

  useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        db.collection("vet").doc(vid).get().then(doc=>{
          if(doc.exists){
            setVet(doc.data())
            setAddress(doc.data().address || doc.data().Address)
          }
        }) 
        if(user){
          db.collection("user").doc(user.uid).get().then(doc=>{
            if(doc.exists){
              setUsr(doc.data())
            }
          })
        }

      })
     
      
  },[mode])

const toggle=(md)=>{
  //setShow(!show)
  setMode(md)
 if (md == 'Home Visit' ){
   setShow(true)
  }
  else{setShow(false)}
}  

const submit=()=>{
 var user = auth.currentUser
 var dateObj= new Date()
 var str= dateObj.toISOString()
 var dateStr= str.slice(0, str.length-1)+'+5:30'
 db.collection("user").doc(user.uid).collection("appointments").doc(dateStr).set({
   date: date, 
   mode: mode,
   time: time,
   patientId: user.uid,
   doctorId: vid,
   address: mode== "Home Visit"? usr.address : mode== "Clinic Visit" ? address : vet.phone,
   doctorName: vet.Name || vet.name,
   clinicName: vet.clinicName,
   
   }).then(()=>{
    window.location= window.location.protocol + "//" + window.location.host + "/" +'allappointments/'
   })
      .catch((err)=>{console.error(err)})  
}
  return (
  <div className="outer">
    {vet ?  (
    <div>
      <h3 className="clinic_name mb-4">{vet.clinicName}</h3>
      <div className="row mb-3">
        <div className="col-12 col-lg-4 vet_p_card">
          <div className="card_img">
            <img src={vet.imgUrl} className="profile_img" />
            <h6 className="clinic_name name">{vet.Name}</h6>
          </div>
          <div className="row justify-content-center">
            <span class="badge-des">Vet</span>
            <span class="badge-des">Training</span>
            <span class="badge-des">Grooming</span>
          </div>
          <div className="text_info ml-4">
            <div className="row mt-2">
              <p className="col-4">
                Qualification:
              </p>
              <p className="col" style={{color:"black"}}>
                {vet.Qualification}
              </p>
            </div>
            <div className="row">
              <p className="col-4">
                Address:
              </p>
              <p className="col" style={{color:"black"}}>
              {vet.Address}
              </p>
            </div>
            <div className="row">
              <p className="col-4">
                City:
              </p>
              <p className="col" style={{color:"black"}}>
                {vet.city}
              </p>
            </div>
            <div className="row">
              <p className="col-4">
                State:
              </p>
              <p className="col" style={{color:"black"}}>
                {vet.state}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 appointment">
          <h4>Book an Appointment</h4>
         
          <div className="col-12">
            <Form.Group>
              <Form.Control className="col-12 mt-3" style={{backgroundColor:"#ffffff",fontSize:"14px",width:"100%",borderRadius:"2px",height:"40px",border:"1px solid #bdbdbd"}} as="select" onChange={(e)=>{toggle(e.target.value)}}>
                  <option defaultChecked>Choose appointment method</option>
                  <option>Home Visit</option>
                  <option>Clinic Visit</option>
                  <option>Video Call</option>
                  <option>Chat</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group>
              <input style={{backgroundColor:"#ffffff",marginLeft:"100px",marginBottom:"20px",fontSize:"14px",width:"100%",borderRadius:"2px",height:"40px",border:"#bdbdbd solid 1px",color:"#686868",textAlign:"left",paddingLeft:"15px"}} className="input_field" type="date"  name="date" onChange={(e)=>{setDate(e.target.value)} } />
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group>
              <input style={{backgroundColor:"#ffffff",marginLeft:"60px",fontSize:"14px",width:"100%",borderRadius:"2px",height:"40px",border:"#bdbdbd solid 1px",color:"#686868",textAlign:"left",paddingLeft:"15px"}} className="input_field" type="time"  name="time" onChange={(e)=>{setTime(e.target.value)} } />
            </Form.Group>
          </div>
          {show==true && usr?
          <div className="col-12 mt-4">
            <div className="address">
              <div style={{textAlign:"left"}}>
                <input className="ml-3 mb-2" style={{float:"left"}} type="radio" checked></input>
                <div style={{textAlign:"left",marginLeft:"50px"}}>
                  <h6>{usr.name}</h6>
                  <p>{usr.address}</p>
                  <p>{usr.zip}</p>
                  <p>{usr.phone}</p>
                  {/*<button className="mr-3 addressbtn">REMOVE</button>*/}
                </div>
              </div>
            </div>
            <div className="addadd mt-4">
                  <p className="ml-3 mb-2">Add a new Address </p>
                  <input className="ml-3 mb-2" type="text" onChange={(e)=>{setAddress(e.target.value)}} /> 
                  <button className="ml-3 mb-2 addressbtn" type="button" onClick={()=>{usr.address=address}}>EDIT</button>
            </div>
          </div>:null}
          
          <button className="blueButton" onClick={submit}>Request Booking</button>
        
       
        </div>
        <div className="col-12 col-lg-4" style={{textAlign:"center"}}>
          <img className="add_img" src={Add} />
        </div>
      </div>
    </div>
    ):null}
  </div>
  );
}
