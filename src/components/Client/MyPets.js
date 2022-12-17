import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import add from "../pictures/Vector (1).png";
import outercircle from "../pictures/Ellipse 13.png";
import petprofile from "../pictures/Ellipse 12.png";
import "./mypets.css";
import {Link} from 'react-router-dom';

const home= window.location.protocol + "//" + window.location.host + "/" +'Home/'

const MyPetsComponent = () => {
  const [uid, setUid]= useState(null)
  const [pets, setPets]= useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setUid(user.uid)
        var ref= db.collection('user').doc(user.uid)
        ref.get()
          .then(doc=>{
            if(doc.exists){
              ref.collection('pets').get()
                .then(docs=>{
                  if(docs){
                    var temp=[]
                    docs.forEach(doc=>{
                      temp.push(doc.data())
                    })
                    setPets(temp)
                  }
                })
            }
          })
      }
    })
  }, [])
  return (
    <div className="wholecomponent">
      
      {
        pets? pets.map(pet=>(
          <div className="onepet">
          <span>
          <img className="petimage" src={pet.url} />
          <div>
            <p className="petname">{pet.name} </p>
            
            <p className="petdetails">
              Category: {pet.category}<br />
              Age: {pet.age} years <br /> Breed: {pet.breed}
            </p>
          </div>
        </span>
      </div>
        )): null
      }
      

      <div className="onepet">
        <span>
          <Link to="/Addpet/">
            <img className="add" style={{ float: "left" }} src={add} />
          </Link>
          <Link to="/Addpet/">
            <p style={{ marginTop: "18px" }} className="petname">
              Add a Pet
            </p>
          </Link>
        </span>
      </div>
    </div>
  );
};
export default function MyPets() {
  const [usr, setUsr] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        alert("login required");
        window.location = home;
      } else {
        setUsr(user);
      }
    });
  });
  return <div>{usr ? <MyPetsComponent /> : null}</div>;
}
