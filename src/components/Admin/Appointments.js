import React, {useState, useEffect} from 'react';
import PastAppointmentCard from './PastAppointmentCard';
import {db} from '../../firebase'
const Orders_List = () => {
    const [arr, setArr]= useState([])
    useEffect(()=>{
        db.collection('Appointments').where('status', '==', 'pending').onSnapshot(snap=>{
            var temp=[]
            snap.forEach(doc=>{
                temp.push({
                    key: doc.id,
                    vet: doc.data().vet,
                    customer: doc.data().customer,
                    status: doc.data().status
                })
            })
            setArr(temp)
        })
    }, [arr])
    return ( 
        <div>
            <div className="row">
                {arr.length? arr.map(app=>(
                    <div className="col-12 col-md-6">
                        <PastAppointmentCard data={app} />
                    </div>
                )): null}
                
                
            </div>
        </div>
     );
}
 
export default Orders_List;