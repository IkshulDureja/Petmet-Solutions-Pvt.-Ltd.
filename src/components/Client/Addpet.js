import React, {useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import ls from 'local-storage';
import {auth, db, storage} from '../../firebase';
import '../Admin/Admin.css'
import {Router, Link} from 'react-router-dom';

export default function Addpet() {

  
  const [uid, setUid]= useState(null)
  const [url, setUrl]= useState(null)

  const [pet, setPet]= useState({
    name: null,
    age: null,
    breed: null,
    category: null,
    weight: null
  })

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setUid(user.uid)
        db.collection('user').doc(user.uid).get()
          .then(doc=>{
            if(!doc.exists){
              alert("some error occured")
            }
          })
      }
    })
    
  },[])

  const addImg=(e)=>{
    var file= e.target.files[0]
    var storageRef= storage.ref('petImages/'+file.name)
    storageRef.put(file).then(()=> {
    alert("image uploaded")
    storageRef.getDownloadURL()
        .then(url=> {
          setUrl(url)
        })
        .catch(err=> console.log(err))
    })
    .catch(err=> console.log(err))
  }
  
  const submit=()=>{
    var ref= db.collection('user').doc(uid).collection('pets')
    const {Name, Age, Breed, Animal, Weight}= pet
    ref.add({
      ...pet,
      url: url
    }).then(()=>{
      // window.location= window.location.protocol + "//" + window.location.host + "/" 
      alert("done")
    })
    
  }

  return (
    <div style={{backgroundColor:"#36a9cc",height:"100vh",paddingTop:"30px",overflowX:"hidden",marginTop:"-100px"}}>
      <div className="row justify-content-center">
        <Link to="/Home/"><button className="mt-2 mr-sm-4 backbtn">Back</button></Link>
        <h1 style={{textAlign:"center",color:"white",marginLeft:"50px"}} >COMPLETE THE PROFILE OF YOUR PETS</h1>
      </div>
        <div className="container frm-bdy">
          <div className="row justify-content-center">
            <div className="col-11 col-sm-5 order-sm-last img-cont">
              <h6 className="mb-3">Add Pet Image</h6>
              <div className="img-container">
                <p>Add a Pet Image</p>
                <input className="ml-sm-4" onChange={addImg} type="file"  id="group_image"/>
                <img id="target"/>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <Form className="addProduct_form">
                        <Form.Group className="row">
                            <Form.Control className="col-12 ml-4" as="input" id="Name"
                               name="Name" autoComplete="pet-name"
                               onBlur={e=>{setPet({...pet, name: e.target.value})}}
                               placeholder="Name">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            
                            <Form.Control className="col-12 ml-4" as="input"
                            id="animal"
                            placeholder="Animal"
                            name="animal"
                            autoComplete="animal"
                            onBlur={e=>{setPet({...pet, category: e.target.value})}}  />
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Control className="col-12 ml-4" as="input"
                             id="breed"
                             placeholder="Breed"
                             name="breed"
                             autoComplete="breed"
                             onBlur={e=>{setPet({...pet, breed: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Control className="col-12 ml-4" as="input"
                             id="age"
                             name="age"
                             placeholder="Age"
                             autoComplete="age"
                             onBlur={e=>{setPet({...pet, age: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Control className="col-12 ml-4" as="input"
                             id="weight"
                             placeholder="Weight"
                             name="weight"
                             autoComplete="weight"
                             onBlur={e=>{setPet({...pet, weight: e.target.value})}}>
                             </Form.Control>
                        </Form.Group>
                        <button className="btn-block blue_btn ml-4 frm-button" type="button" onClick={submit} >
                            Submit
                        </button>
                      
                    </Form>
            </div>
          </div>    
        </div>
    </div>
  );
};

