import React from "react";
import loginImg from "../../login.svg";
import * as firebase from 'firebase'
import {auth} from '../../firebase'

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var user=auth.currentUser
    if(! user){
      console.log("signin/signup")
    }
    else if(!user.emailVerified){
      user.sendEmailVerification().then(function() {
        alert("verification Email sent.")
      }).catch(function(error) {
        console.error(error)
      });
    }
    else{
      // put the location of home page and in home page use the same logic to redirect 
      // the user to signup page if user is not verified
      window.location="https://www.youtube.com/"
    }
    console.log(user)
  }

  googleSignup=()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
      var user = result.user;
      console.log(user)
    }).catch(function(error) {
      var errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  fbSignup=()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
      var user = result.user;
      console.log(user)
    }).catch(function(error) {
      var errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  fillMail=(e)=>{ 
      this.setState({
        ...this.state,
        mail: e.target.value       
      })
  }
  fillPass=(e)=>{ 
    this.setState({
      ...this.state,
      pass: e.target.value       
    })
  }

  signupEmail=()=>{
    auth.createUserWithEmailAndPassword(this.state.mail, this.state.pass).catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef} style={{paddingTop:"2em", marginBottom:"3em" }} >
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" onBlur= {this.fillMail} placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onBlur= {this.fillPass} placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.signupEmail} >
            Register
          </button>
          <button type="button" className="btn" onClick={this.googleSignup} >
            Google
          </button>
          <button type="button" className="btn" onClick={this.fbSignup} >
            Facebook
          </button>
        </div>
      </div>
    );
  }
}
