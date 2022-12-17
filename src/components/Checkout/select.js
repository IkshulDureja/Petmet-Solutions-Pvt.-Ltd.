// import React from "react";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import { BrowserRouter, Route, Link } from "react-router-dom";
// import Checkout from "./Checkout";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

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

export default function Select(props) {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="absolute" color="default" className={classes.appBar}>
        {/* <Toolbar>
          {/* <Typography variant="h6" color="inherit" noWrap>
            PETMET
          </Typography> */}
      {/* </Toolbar> */}
      {/* </AppBar> */}

      {/* <Typography variant="h6" gutterBottom>
        Select your Role
      </Typography> */}

      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6}> */}
      <Button
        style={{
          backgroundColor: "#36A9CC",
          marginBottom: "10px !important",
          padding: "10px 30px !important",
          color: "#fff !important",
          justifyContent: "center !important",
        }}
        variant="contained"
        color="primary"
        onClick={props.onNavigate}
      >
        <Link to="/Checkout">CLIENT</Link>
      </Button>
      <br />
      {/* </Grid>
      </Grid> */}

      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6}> */}
      <Button
        style={{ backgroundColor: "#36A9CC" }}
        variant="contained"
        color="primary"
        onClick={props.transfer}
      >
        <Link to="/VetForm">VET</Link>
      </Button>
      {/* </Grid>
      </Grid> */}
    </React.Fragment>
  );
}
