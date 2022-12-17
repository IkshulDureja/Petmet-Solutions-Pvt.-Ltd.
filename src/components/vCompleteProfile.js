import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
import ls from 'local-storage';
import {auth, db, storage} from '../firebase'
import {Form} from 'react-bootstrap';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: "100%"
    },
    button: {
      marginRight: 10,
      borderRadius: 100,
      fontSize: 20,
    },
    instructions: {
      marginTop: 2,
      marginBottom: 5
    }
  });
export default function VCompleteProfile() {
    
  const classes = useStyles();
  const [uid, setUid]= useState(null)
 const[url, setUrl]= useState(null)
  const [vet, setVet]= useState({})

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setUid(user.uid)
        db.collection('vet').doc(user.uid).get()
          .then(doc=>{
            if(!doc.exists){
              db.collection("vet").doc(user.uid).set({
                profileCompleted: false,
                //alert("some error occured")  
              });
            }else if (doc.data().profileCompleted) {
              window.location = window.location.protocol + "//" + window.location.host + "/" +'v/Profile';
            }
          });
      }
    })
   
  },[])

  const addImg=(e)=>{
    var file= e.target.files[0]
    var storageRef= storage.ref('vetImages/'+file.name)
    storageRef.put(file).then(()=> {
    alert("image uploaded")
    storageRef.getDownloadURL()
        .then(url=> setUrl(url))
        .catch(err=> console.log(err))
    })
    .catch(err=> console.log(err))
  }
 
  
  const submit=()=>{
    const {name, phone, achievements, experience, qualification, address, city, state, zip }= vet
    db.collection('vet').doc(uid).update({
      ...vet,
      profileCompleted: true,
      imgUrl: url
    }).then(()=>{
      window.location= window.location.protocol + "//" + window.location.host + "/" +'v/Profile'
    })
  }

  return (
    <React.Fragment>
      <h1 className="main-head mt-4">COMPLETE YOUR PROFILE</h1>
        <div className="container m-5">
                    <Form className="addProduct_form">
                    <div className="row mb-3">
                            <Form.Label className="col-3">Add Vet Image</Form.Label>
                            <input onChange={addImg} type="file"  id="group_image"/>
                            <img id="target"/>
                        </div>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Name</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input" id="Name"
                               name="Name" autoComplete="given-name"
                               onBlur={e=>{setVet({...vet, Name: e.target.value})}}>
                               </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Phone No.</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                            id="phone"
                            name="phone"
                            autoComplete="phone"
                            onBlur={e=>{setVet({...vet, phone: e.target.value})}}>
                          </Form.Control>
                            </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Achievements</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="textarea" rows="3"
                             id="Achievements"
                             name="Achievements"
                             autoComplete="Achievements"
                             onBlur={e=>{setVet({...vet, Achievements: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Qualification</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="qualification"
                             name="qualification"
                             autoComplete="qualification"
                             onBlur={e=>{setVet({...vet, Qualification: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Experience in Years</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="experience"
                             name="experience"
                             autoComplete="years"
                             onBlur={e=>{setVet({...vet, experience: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Address</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="Address"
                             name="Address"
                             autoComplete="Address"
                             onBlur={e=>{setVet({...vet, Address: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">City</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="city"
                             name="city"
                             autoComplete="city"
                             onBlur={e=>{setVet({...vet, city: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">State</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="state"
                             name="state"
                             autoComplete="state"
                             onBlur={e=>{setVet({...vet, state: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Zip</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="zip"
                             name="zip"
                             autoComplete="Zip / Postal code"
                             onBlur={e=>{setVet({...vet, zip: e.target.value})}}>
                               </Form.Control>
                        </Form.Group>
                        <button type="button" className="offset-4 offset-sm-3 pink_out" onClick={submit}>
                            Finish
                        </button>
                    </Form>
                </div>
    </React.Fragment>
  );
}

