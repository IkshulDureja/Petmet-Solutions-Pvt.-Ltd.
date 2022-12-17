import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { auth, db } from "../../firebase";
import ls from "local-storage";
import MainLogo from "../pictures/Logo WT Tagline PET MET.png";
import "./checkout.css";
import PetProfile from "./PetProfile";

const vMail= window.location.protocol + "//" + window.location.host + "/" +'verifyEmail/'

const home= window.location.protocol + "//" + window.location.host + "/" +'Home/'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        PetMet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Your  Profile", "Your Profile", "Pet Profile"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PaymentForm />;
    case 1:
      return <AddressForm />;
    case 2:
      return <PetProfile />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location = window.location.protocol + "//" + window.location.host + "/" +"login";
      } else if (!user.emailVerified) {
        window.location = vMail;
      } else {
        setUid(user.uid);
        db.collection("user")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (user.emailVerified && !doc.exists) {
              db.collection("user").doc(user.uid).set({
                name: user.displayName,
                profileCompleted: false,
              });
            } else if (doc.data().profileCompleted) {
              window.location = home;
            }
          });
      }
    });
  }, []);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const skip = () => {
    window.location = home;
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const submit = () => {
    db.collection("user")
      .doc(uid)
      .update({
        name: ls.get("name"),
        mail: ls.get("mail"),
        phone: ls.get("phone"),
        address: ls.get("address"),
        city: ls.get("city"),
        state: ls.get("state"),
        pinCode: ls.get("pin"),
      });
    db.collection("user")
      .doc(uid)
      .collection("pets")
      .add({
        category: ls.get("animal"),
        age: ls.get("age"),
        gender: ls.get("gender"),
        breed: ls.get("breed"),
        name: ls.get("petName"),
      });
    setActiveStep(activeStep + 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <img
              className="mainlogocheckout"
              style={{ width: "130px", height: "33px" }}
              src={MainLogo}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{
              color: "black",
              fontFamily: " Roboto",
              fontStyle: "normal",
            }}
            component="h1"
            variant="h4"
            align="center"
          >
            Complete your Profile
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1 ? submit : handleNext
                    }
                    className="checkoutbutton"
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={skip}
                    className="checkoutbutton"
                  >
                    Skip
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
