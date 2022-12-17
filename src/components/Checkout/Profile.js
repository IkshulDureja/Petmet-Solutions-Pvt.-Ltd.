// import React from "react";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import { makeStyles } from "@material-ui/core/styles";
// import Select from "./select";
// import Checkout from "./Checkout";
// import VetForm from "./VetForm";
// import { BrowserRouter, Route, Link } from "react-router-dom";
//import MainLogo from "../Final Main Logo PET MET.png";
//import LargePicture from "../undraw_good_doggy_4wfq 1.png";

// class Profile extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       screen: "Select", //App,Select
//     };
//   }

//   navigate = () => {
//     this.setState({
//       screen: "Checkout",
//     });
//   };

//   render() {
//     const imagestyle = {
//       width: "173px",
//       height: "64px",
//       left: "120px",
//       top: "90px",
//       marginTop: "4%",
//       display: "block",
//       marginLeft: "auto",
//       marginRight: "auto",
//     };

//     const secondimage = {
//       width: "248px",
//       height: " 177px",
//       left: " 83px",
//       top: "209px",
//       marginTop: "30px",
//       justifyContent: "center",
//       display: "block",
//       marginLeft: "auto",
//       marginRight: "auto",
//     };
//     const welcome = {
//       textAlign: "center",
//     };
//     return (
//       <div>
//         <h2 style={welcome}>WELCOME! HOW MAY WE ADDRESS YOU?</h2>
//         <Route exact path="/select" component={Select} />
//         <Route exact path="/Checkout" component={Checkout} />
//         <Route exact path="/VetForm" component={VetForm} />
//       </div>
//     );
//   }
// }

// export default Profile;
