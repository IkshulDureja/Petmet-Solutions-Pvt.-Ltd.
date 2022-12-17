import React, {useEffect, useState} from 'react'
import {auth, db} from '../firebase'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const vcp= window.location.protocol + "//" + window.location.host + "/" + 'vCompleteProfile'


const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));


export default function VVerifyEmail() {
    const classes = useStyles();
    const [button, setButton]= useState(false)
    const logout=()=>{
        auth.signOut().then(()=>{
            window.location.reload()
        })
    }
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                if(user.emailVerified){
                    db.collection('vet').doc(user.uid).get()
                        .then(doc=>{
                            if(!doc.exists){
                                db.collection('vet').doc(user.uid).set({
                                    profileCompleted: false
                                })
                                window.location= vcp
                            }
                            else if(!doc.data().profileCompleted) 
                                window.location= vcp
                            else{
                                window.location= window.location.protocol + "//" + window.location.host + "/" +'v/Profile/'
                            }
                        })
                        setButton(true)
                }else{
                    alert("verification link was sent to your registered email")
                }
            }else{
                window.location= window.location.protocol + "//" + window.location.host + "/" +'vLogin'
            }
        })
    },[])
    const move=()=>{
        window.location= vcp
    }
    
    const sendVerification=()=>{
        var usr= auth.currentUser
        usr.sendEmailVerification().then(()=> {
            alert("new email verification mail sent")
          }).catch(function(error) {
            console.log(error)
          });
    }
    return (
        <div>
            <h3>Email verification Link was sent to your registered email.<br /> 
            Verify and refresh this page </h3>
            
            {button? (<div>
                <Button
                        variant="contained"
                        color="primary"
                        onClick={move}
                        className={classes.button}
                >
                        Complete Profile
                </Button>
            </div>): (
                <div>
                <Button
                variant="contained"
                color="primary"
                onClick={logout}
                className={classes.button}
                >
                Logout
                </Button>
                <Button
                variant="contained"
                color="primary"
                onClick={sendVerification}
                className={classes.button}
                >
                send verification link again
                </Button>
        </div>
            )}
        </div>
    )
}
