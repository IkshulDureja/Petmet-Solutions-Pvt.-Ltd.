import React, {useEffect} from 'react'
import * as firebase from 'firebase'
import * as firebaseui from "firebaseui";
import {auth} from '../firebase';


const home= window.location.protocol + "//" + window.location.host + "/" +'Home/'
export default function Phone() {
    useEffect(()=>{
        
        auth.onAuthStateChanged(user=>{
            if(user) window.location= home
            
          })   

        const uiConfig = {
            signInSuccessUrl: {home}, //This URL is used to return to that page when we got success response for phone authentication.
            signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
            tosUrl: {home}
          };
          var ui = new firebaseui.auth.AuthUI(firebase.auth());
          ui.start("#firebaseui-auth-container", uiConfig);
    },[])
    return (
        <div>
            <div id="firebaseui-auth-container"></div>
        </div>
    )
}
