import React, { useState, useEffect } from 'react';
import './VetProfile.css';
import { db, auth } from "../../firebase";

const AllAppointments = () => {
    const [uid, setUid]= useState(null)
    const [appoint, setAppoint]= useState(null)
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          setUid(user.uid)
          var ref= db.collection('user').doc(user.uid)
          ref.get()
            .then(doc=>{
              if(doc.exists){
                ref.collection('appointments').get()
                  .then(docs=>{
                    if(docs){
                      var temp=[]
                      docs.forEach(doc=>{
                        temp.push(doc.data())
                      })
                      setAppoint(temp)
                    }
                  })
              }
            })
        }
      })
    }, [])
    return ( 
        <div>
            { appoint ? appoint.map( app=>(
                <div style={{margin:"0px"}}>
                 <div className="outer ">
                 <h3 className="clinic_name mb-2">{app.clinicName}</h3>
                 <div className="container">
                     <h6 className="clinic_name mb-4">{app.doctorName}</h6>
                     <div className="row">
                         <div className="col-12 col-md-4">
                             <div className="col-12 sections mb-4">
                                 {app.mode}
                             </div>
                             <div className="col-12 sections mb-4">
                                 {app.date}
                             </div>
                             <div className="col-12 sections mb-4">
                                 {app.time}
                             </div>
                         </div>
                         <div className="col-12 col-md-8 sections mb-4">
                             <p className="card_text">{app.address}</p>
                             <div className="row justify-content-end">
                               {app.status=="confirmed"||app.status=="accepted"?
                               <span className="badges_new conf">Booking Confirmed</span>:
                               app.status=="declined"?<span className="badges_new track">Declined</span>:
                               <span className="badges_new confirm_pend">Confirmation Pending</span>} 
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
                 </div>
            )):null}
           
        </div>
     );
}
 
export default AllAppointments;