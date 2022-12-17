import React, {useEffect} from 'react'
import {auth, db} from '../firebase'

export default function VWaiting() {
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(!user){
                window.location= window.location.protocol + "//" + window.location.host + "/" +'vLogin'
            }
            else if(!user.emailVerified){
                window.location= window.location.protocol + "//" + window.location.host + "/" +'vVerifyEmail'
            }
            else{
                db.collection('vet').doc(user.uid).get()
                    .then(doc=>{
                        if(doc.exists){
                            if(doc.data().profileCompleted){
                                window.location= window.location.protocol + "//" + window.location.host + "/" +'v/Profile'
                            }
                            else{
                                window.location= window.location.protocol + "//" + window.location.host + "/" +'vCompleteProfile'
                            }
                        }else{
                            db.collection('vet').doc(user.uid).set({
                                profileCompleted: false
                            }).then(()=> window.location.reload())
                        }
                    })
            }
        })
    },[])
    return (
        <div>
            <h5>Processing your info. Just a sec </h5>
        </div>
    )
}
