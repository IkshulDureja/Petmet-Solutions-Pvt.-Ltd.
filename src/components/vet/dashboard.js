import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
//import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./listItems";
import AddSlot from "./addSlot";
//import Footer from "../footer/App";
import { db, auth } from "../../firebase";
import Profile from "./profile";
import Appointments from "./Appointment";
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditProfile from './EditProfile';
import MainLogo from "../pictures/Logo WT Tagline PET MET.png";


import { useParams, Link as Linkk} from 'react-router-dom'
import Footer from "../FooterNew";

var slots = [];
function getData() {
  db.collection("vet")
    .doc("Wsqzi5DoefSSpKvTKELy")
    .collection("freeSlots")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        slots.push(doc.data());
      });
    })
    .catch((err) => {
      console.log("something went wrong");
      console.error(err);
    });
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        petmet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#F1F1F1",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingTop: theme.spacing(5),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    paddingTop: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function VDashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // getData();

  const {vd}= useParams()
  const [state, setState] = useState({
    slots: [],
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location = window.location.protocol + "//" + window.location.host + "/" +"vLogin";
      } else {
        if (!user.emailVerified) {
          window.location = window.location.protocol + "//" + window.location.host + "/" + "vVerifyEmail";
        } else {
          db.collection("vet")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (!doc.exists || !doc.data().profileCompleted) {
                window.location = window.location.protocol + "//" + window.location.host + "/" +"vCompleteProfile";
              }
            });
        }
      }
    });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper);

  const logout=()=>{
    auth.signOut().then(function() {
      console.log("Sign-out successful")
      window.location.reload()
    }).catch(function(error) {
      console.log(error)
    })
  }

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{color: "white"}} noWrap>
            <img className="mainlogoonnav"
              style={{ width: "130px", height: "33px" }}
              src={MainLogo}></img>
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose} >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{width: "100%"}}>{mainListItems}</List>
        <Divider />

        <Linkk to="/v/editProfile">
                <ListItem button >             
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit Profile" />              
                </ListItem>
        </Linkk>
        <ListItem button onClick={logout} >             
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
              <ListItemText primary="Logout"/>              
            </ListItem>
      </Drawer>
      <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container className={classes.container}>
      { vd==='Profile'? (<Profile />): vd==='AddSlot'? (<AddSlot />): vd==='Appointments'? (<Appointments/>) : vd==='editProfile'? (<EditProfile />): (<Profile />) }

      </Container>
            
            <Footer />    
      </main>
    </div>
  );
}

