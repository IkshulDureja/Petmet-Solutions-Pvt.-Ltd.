import React, {useState, useEffect } from 'react';
import {Form,Button} from 'react-bootstrap';
import './vet.css';
import {auth,db, storage} from '../../firebase'

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
export default function EditProfile() {
    
  const classes = useStyles();
  const [uid, setUid]= useState(null)
 const[url, setUrl]= useState(null)
  const [doc, setDoc]= useState({
    Name: null,
    phone: null,
    Achievements: null,
    experience: null,
    Qualification: null,
   Addrees:null,
   city:null,
    state: null,
    zip:null
  
  })

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setUid(user.uid)
        db.collection('vet').doc(user.uid).get()
          .then(doc=>{
            if(doc.exists){
                setDoc(doc.data())

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
    db.collection('vet').doc(uid).update({
      ...doc,
      //profileCompleted: true,
    }).then(()=>{
    // window.location= window.location.protocol + "//" + window.location.host +  "/" +'v/Profile'
    alert("Profile Updated");
    })
    
  }

  return (
    <React.Fragment>
      <h1 className="main-head mt-4">EDIT YOUR PROFILE</h1>
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
                               onBlur={e=>{setDoc({...doc, Name: e.target.value})}}>
                               </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Phone No.</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                            id="phone"
                            name="phone"
                            autoComplete="phone"
                            onBlur={e=>{setDoc({...doc, phone: e.target.value})}}>
                          </Form.Control>
                            </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Achievements</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="textarea" rows="3"
                             id="Achievements"
                             name="Achievements"
                             autoComplete="Achievements"
                             onBlur={e=>{setDoc({...doc, Achievements: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Qualification</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="qualification"
                             name="qualification"
                             autoComplete="qualification"
                             onBlur={e=>{setDoc({...doc, Qualification: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Experience in Years</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="experience"
                             name="experience"
                             autoComplete="years"
                             onBlur={e=>{setDoc({...doc, experience: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Address</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="Address"
                             name="Address"
                             autoComplete="Address"
                             onBlur={e=>{setDoc({...doc, Address: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">City</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="city"
                             name="city"
                             autoComplete="city"
                             onBlur={e=>{setDoc({...doc, city: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">State</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="state"
                             name="state"
                             autoComplete="state"
                             onBlur={e=>{setDoc({...doc, state: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Zip</Form.Label>
                            <Form.Control required className="col-7 col-sm-9 offset-sm-0 offset-1" as="input"
                             id="zip"
                             name="zip"
                             autoComplete="Zip / Postal code"
                             onBlur={e=>{setDoc({...doc, zip: e.target.value})}}>
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

