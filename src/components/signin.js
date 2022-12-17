import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { auth, db } from "../firebase";
import * as firebase from "firebase";
import mainlogo from "./pictures/Final Main Logo PET MET.png";
import picture from "./pictures/undraw_good_doggy_4wfq 1.png";
import "./signin.css";

import fblogo from "./pictures/fblogo.png";
import googlelogo from "./pictures/googlelogo.png";

const home =
  window.location.protocol + "//" + window.location.host + "/" + "Home/";
const vMail =
  window.location.protocol + "//" + window.location.host + "/" + "verifyEmail/";
const rCheck =
  window.location.protocol + "//" + window.location.host + "/" + "checkout/";
const rP =
  window.location.protocol + "//" + window.location.host + "/" + "phone/";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Petmet {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  mainlogo: {
    width: " 213px",
    height: "104px",
    marginLeft: "45%",
    marginTop: "100px",
    position: "relative",
  },
  picture: {
    position: "relative",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [phone, setPhone] = useState(null);
  const [newUser, togglenewUser] = useState(false);
  const [usr, setUsr] = useState();
  const [mail, setMail] = useState(null);
  const [pass, setPass] = useState(null);
  const [name, setName] = useState(null);

  const toggle = () => {
    togglenewUser(!newUser);
  };

  useEffect(() => {
    // alert(auth.currentUser)
    auth.onAuthStateChanged((user) => {
      if (user) console.log(user);
      if (user && user.emailVerified) {
        window.location = home;
      }
    });
  }, []);

  const signupEmail = () => {
    if (mail && pass && name) {
      auth.createUserWithEmailAndPassword(mail, pass).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
      auth.onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: name,
          });
          user
            .sendEmailVerification()
            .then(() => {
              window.location = vMail;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    } else {
      alert("email and password required");
    }
  };

  const googleSignup = () => {
    var currUser = auth.currentUser;
    if (!currUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(function (result) {
          var user = result.user;
          // new line
          if (user) {
            window.location = rCheck;
          }
        })
        .catch(function (error) {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  const fbSignup = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        if (user) {
          console.log(user);
          // window.location= rCheck
        }
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const fbSignin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        if (user) {
          window.location = home;
        }
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const phoneSignup = () => {
    window.location = rP;
  };

  const phoneSignin = () => {
    window.location = rP;
  };

  const goToVet = () => {
    window.location =
      window.location.protocol + "//" + window.location.host + "/" + "vLogin/";
  };

  const googleSignin = () => {
    var currUser = auth.currentUser;
    if (!currUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(function (result) {
          var user = result.user;
        })
        .catch(function (error) {
          var errorMessage = error.message;
          console.log(errorMessage);
        });

      auth.onAuthStateChanged((user) => {
        if (user) {
          window.location = home;
        }
      });
    }
  };

  const emailLogin = () => {
    if (mail && pass) {
      auth.signInWithEmailAndPassword(mail, pass).catch(function (error) {
        var errorMessage = error.message;
        console.error("errorMessage");
      });

      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("Admin")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                window.location =
                  window.location.protocol +
                  "//" +
                  window.location.host +
                  "/admin/" +
                  "verifyVet/";
              } else {
                console.log("user");
                if (user) {
                  if (!user.emailVerified) {
                    window.location = vMail;
                  } else {
                    window.location = home;
                  }
                }
              }
            })
            .catch((e) => console.error(e));
        }
      });
    } else {
      alert("email and password required");
    }
  };

  const resetPassword = () => {
    auth
      .sendPasswordResetEmail(mail)
      .then(() => {
        alert("password change link was sent to your email address ");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid className="leftgrid" item xs={false} sm={4} md={7}>
        <img className={classes.mainlogo} src={mainlogo} />
        <br />
        <img
          className={classes.picture}
          style={{ height: " 500px" }}
          src={picture}
        />
      </Grid>

      <Grid
        className="rightgrid"
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography style={{ color: "#36A9CC" }} component="h1" variant="h5">
            {newUser ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} noValidate>
            {newUser ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                onBlur={(e) => {
                  setName(e.target.value);
                }}
              />
            ) : null}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onBlur={(e) => {
                setMail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onBlur={(e) => {
                setPass(e.target.value);
              }}
            />
            <br />
            <span className="or">or</span>
            <br />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="phone"
              label="Phone"
              id="password"
              onBlur={(e) => {
                setPhone(e.target.value);
              }}
            />

            <Button
              type="button"
              fullWidth
              style={{ backgroundColor: "#36A9CC" }}
              class="btn btn-primary btn-lg btn-block"
              variant="contained"
              onClick={newUser ? signupEmail : emailLogin}
            >
              {newUser ? "Sign Up" : "Sign In"}
            </Button>
            <span>
              <button
                type="button"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#36A9CC" }}
                className="facebookbutton"
                onClick={newUser ? fbSignup : fbSignin}
              >
                <img className="logosonsignup" src={fblogo} />
                {newUser ? "Sign Up with facebook" : "Sign In with facebook"}
              </button>
              <button
                type="button"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#36A9CC" }}
                className=" googlebutton"
                onClick={newUser ? googleSignup : googleSignin}
              >
                <img className="logosonsignup" src={googlelogo} />
                {newUser ? "Sign Up with Google" : "Sign In with Google"}
              </button>
            </span>

            {/* <Button
              type="button"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#36A9CC", marginBottom: "20px" }}
              class="btn btn-primary btn-lg btn-block"
              onClick={newUser ? phoneSignup : phoneSignin}
            >
              {newUser ? "Sign Up with phone no." : "Sign In with phone no."}
            </Button> */}

            <Grid container>
              {!newUser ? (
                <Grid item xs>
                  <Link onClick={resetPassword} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              ) : null}

              <Grid item>
                <Link variant="body2" onClick={toggle}>
                  {!newUser
                    ? "Don't have an account? Sign Up"
                    : "Already a user? Sign In"}
                </Link>
              </Grid>
            </Grid>

            {/* <Button
              type="button"
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "#36A9CC",
                border: "1px solid #36A9CC",
                marginTop: "20px",
              }}
              class="btn btn-primary btn-lg btn-block"
              onClick={goToVet}
            >
              Sign In as vet
            </Button> */}

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
