import React from "react";
import loginImg from "../../login.svg";
import {auth} from '../../firebase'
import * as firebase from 'firebase'


// logout function and button using it shall be shifted to navbar when dashboard is ready
// as it does not make sense here

export class Login extends React.Component {
  constructor(props) {
    super(props);
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

  componentDidMount(){
    var user=auth.currentUser
    if(! user){
      console.log("signin/signup")
    }
    else if(!user.emailVerified){
      alert("you need to verify your email 1st, verification mail was sent to your registered email")
      user.sendEmailVerification().then(function() {
        console.log("Email sent")
      }).catch(function(error) {
        console.log(error)
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

  emailLogin=()=>{
    firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.pass).catch(function(error) {
      var errorMessage = error.message;
      console.error(errorMessage)
    });
  }

  signOut=()=>{
    auth.signOut().then(function() {
      console.log("Sign-out successful")
    }).catch(function(error) {
      console.log(error)
    })
  }


  render() {
    return (
      <div className="base-container" ref={this.props.containerRef} style={{marginTop:"2em", marginBottom:"3em" }} >
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onBlur={this.fillMail} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onBlur={this.fillPass} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.emailLogin}>
            Login
          </button>
          <button type="button" className="btn" onClick={this.signOut}>
            Logout
          </button>
          <button type="button" className="btn" onClick={this.googleSignup}>
            Google 
          </button>
          <button type="button" className="btn" onClick={this.fbSignup}>
            Facebook
          </button>
        </div>
      </div>
    );
  }
}
