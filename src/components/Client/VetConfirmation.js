import React , { useState, useEffect }from 'react';
import './VetProfile.css';
import { db, auth } from "../../firebase";
import Carousel from 'react-elastic-carousel';
import SquareCard from './SquareCard';
import { app } from 'firebase';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 240, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 },
  ];

const VetConfirmation = () => {
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
                <div>
                 <div className="outer mb-4">
                 <h3 className="clinic_name mb-4">ORTHO VET CLINIC</h3>
                 <div className="container">
                     <h6 className="clinic_name mb-4">{app.doctorId}</h6>
                     <div className="row">
                         <div className="col-12 col-md-4">
                             <div className="col-12 sections mb-4">
                                 {app.mode}
                             </div>
                             <div className="col-12 sections mb-4">
                                 {app.date}
                             </div>
                             <div className="col-12 sections">
                                 {app.time}
                             </div>
                         </div>
                         <div className="col-12 col-md-8 sections">
                             <p className="card_text">{app.address}</p>
                             <div className="row justify-content-end">
                                 <span className="badges_new confirm_pend">Confirmation Pending</span>
                                 <span className="badges_new conf">Booking Confirmed</span>
                                 <span className="badges_new track">Track Address</span>
                             </div>
                         </div>
                     </div>
                     <div className="row mt-4">
                         <div className="col-9">
                             <p style={{color:"#03a300", fontSize:"25px"}}>Your booking request has been sent. Our team will reach out to you in 24 hours.</p>
                         </div>
                         <div className="col" style={{textAlign:"right"}}>
                             <span className="badges_new help">Need Help ?</span>
                         </div>
                     </div>
                     <hr />
                 </div>
             </div>
             <h2 className="mt-4" style={{paddingBottom: "20px"}}>TOP FEATURED</h2>
                 <div style={{justifyContent: "center",paddingBottom: "40px"}}>
                     <Carousel breakPoints={breakPoints}>
                         <item>
                         <SquareCard />
                         </item>
                         <item>
                         <SquareCard />
                         </item>
                         <item>
                         <SquareCard />
                         </item>
                         <item>
                         <SquareCard />
                         </item>
                     </Carousel>
                 </div>
                 </div>
            )):null}
           
        </div>
     );
}
 
export default VetConfirmation;