import React, {useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import ls from 'local-storage'
import '../Admin/Admin.css';
import {auth, db, storage} from '../../firebase';
import '../Admin/Admin.css'
import {Router, Link} from 'react-router-dom';

export default function EditProfile() {

  const [uid, setUid]= useState(null)
  const [client,setClient]=useState(null)
  const [profile, setProfile]= useState({
    name: null,
    mail: null,
    address: null,
    phone: null,
    city: null,
    state: null,
    zip:null
  })

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setUid(user.uid)
        db.collection('user').doc(user.uid).get()
          .then(doc=>{
            if(doc.exists){
             // docs.forEach(doc=>{
              setProfile(doc.data())
              setClient(doc.data())}
          }
          )
      }
    })
    
  },[])

  const submit=()=>{
    db.collection('user').doc(uid).update({
      ...profile,
      profileCompleted: true,
    }).then(()=>{
      window.location= window.location.protocol + "//" + window.location.host + "/" +'Home/'
    })
    
  }


  return (
    <React.Fragment>
      <h1 className="main-head mt-4">UPDATE YOUR PROFILE</h1>
        <div className="container m-4">
          <Form className="addProduct_form">
          <Form.Group className="row">
              <Form.Label className="col-3">Name</Form.Label>
              <Form.Control required className="col-7 col-sm-8 offset-sm-0 offset-1" as="input" id="Name"
                 name="Name" autoComplete="given-name"
                 placeholder={client?client.name:null}
                 onBlur={e=>{setProfile({...profile, name: e.target.value})}}> 
                 </Form.Control>
          </Form.Group>
          <Form.Group className="row">
              <Form.Label className="col-3">E-Mail</Form.Label>
              <Form.Control required className="col-7 col-sm-8 offset-sm-0 offset-1" as="input"
              id="mail"
              name="mail"
              autoComplete="email"
              placeholder={client?client.mail:null}
              onBlur={e=>{setProfile({...profile, mail: e.target.value})}}> 
              </Form.Control>
              </Form.Group>
          <Form.Group className="row">
              <Form.Label className="col-3">Phone Number</Form.Label>
              <Form.Control required className="col-7 col-sm-8 offset-sm-0 offset-1" as="input"
               id="phone"
               name="phone"
               autoComplete="number"
               placeholder={client?client.phone:null}
               onBlur={e=>{setProfile({...profile, phone: e.target.value})}}> 
               </Form.Control>
          </Form.Group>
          <Form.Group className="row">
              <Form.Label className="col-3">Address</Form.Label>
              <Form.Control required className="col-7 col-sm-8 offset-sm-0 offset-1" as="input"
               id="address"
               name="address"
               autoComplete="address"
               placeholder={client?client.address:null}
               onBlur={e=>{setProfile({...profile, address: e.target.value})}}> 
               </Form.Control>
          </Form.Group>
          <Form.Group className="row">
              <Form.Label className="col-3">City</Form.Label>
              <Form.Control required className="col-7 col-sm-8 offset-sm-0 offset-1" as="input"
               id="city"
               name="city"
               autoComplete="city"
               placeholder={client?client.city:null}
               onBlur={e=>{setProfile({...profile, city: e.target.value})}}> 
               </Form.Control>
          </Form.Group>
          <Form.Group className="row">
              <Form.Label className="col-3">State</Form.Label>
              <Form.Control required className="col-7 col-sm-8 offset-sm-0 offset-1" as="input"
               id="state"
               name="state"
               autoComplete="state"
               placeholder={client?client.state:null}
               onBlur={e=>{setProfile({...profile, state: e.target.value})}}> 
               </Form.Control>
          </Form.Group>
          <Form.Group className="row">
              <Form.Label className="col-3">Zip</Form.Label>
              <Form.Control required className="col-7 col-sm-8 offset-sm-0 offset-1" as="input"
               id="zip"
               name="zip"
               autoComplete="shipping postal-code"
               placeholder={client?client.zip:null}
              onBlur={e=>{setProfile({...profile, zip: e.target.value})}}> 
               </Form.Control>
          </Form.Group>
          <button type="button" className="offset-4 offset-sm-3 pink_out" onClick={submit}>
              Update
          </button>
      </Form>
      

                </div>
    </React.Fragment>
  );
}
