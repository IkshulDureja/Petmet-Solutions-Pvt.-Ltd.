import React, { useState, useEffect } from "react";
import clsx from "clsx";
import "./DASHBOARD.css";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import { Route, Switch, Link, useParams } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import MyLeads from './myLeads';
import EditProfile from "./Profile";
import { auth, db } from "../../firebase";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import DashboardClient from "../dashboardclient/DashboardClient";
// import Lead from './lead'
import MainLogo from "../pictures/Logo WT Tagline PET MET.png";
import Addpet from "./Addpet";
import MyPets from "./MyPets";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Appointment from "./Appointment";
import Home from "./Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ShopPage from "../shop/ShopPage";
import ShopProducts from "./ShopProducts";
import Footer from "../FooterNew";
import VetProfile from "./VetProfile";
import { Button } from "@material-ui/core";
import Cat from "../pictures/cat.png";
import { MdAccountCircle, MdShoppingCart } from "react-icons/md";
import {
  Modal,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { HiSwitchHorizontal } from "react-icons/hi";
import { GrAdd } from "react-icons/gr";
import VetConfirmation from "./VetConfirmation";
import AllAppointments from "./AllAppointments";
import Cart2 from "./Cart2";
import PrivacyPolicy from './PrivacyPolicy';
import OrderCompleted from './OrderCompleted';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // toolbar: {
  //   paddingRight: 24,
  //   backgroundColor: "#F1F1F1",
  // },
  // toolbarIcon: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   padding: "0 8px",
  //   ...theme.mixins.toolbar,
  // },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    zIndex: "100000",
    width: "100%",
  },

  container: {
    zIndex: theme.zIndex.appBar - 1,
    // paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  paper: {
    // padding: theme.spacing(0),
    // display: "flex",
    // overflow: "auto",
    // flexDirection: "column",
  },
  // fixedHeight: {
  //   height: 240,
  // },
}));

const Modall = (prop) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [usr, setUsr] = useState(null);
  useEffect(() => {
    console.log(prop);
    var user = auth.currentUser;
    if (user) {
      setUsr(user);
    }
  }, []);
  const logout = () => {
    auth
      .signOut()
      .then(function () {
        alert("Sign-out successful");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Button
        className="accounticon"
        style={{
          float: "right",
          display: "inline",
          paddingLeft: "30px",
          color: "grey",
        }}
        onClick={handleShow}
      >
        <AccountCircleIcon />
        {prop.prop ? prop.prop : "guest user"}
      </Button>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: "80px",
              paddingBottom: "20px",
              color: "#36A9CC",
            }}
          >
            <RiLogoutBoxRFill />
          </span>
          <button
            className="btn-block pink-btn"
            onClick={
              prop.prop
                ? logout
                : () => {
                    window.location =
                      window.location.protocol +
                      "//" +
                      window.location.host +
                      "/" +
                      "login";
                  }
            }
            style={{}}
          >
            {prop.prop ? "Log Out" : "Log In"}
          </button>
        </Modal.Body>
        <Modal.Footer>
          <button className="pink-btn" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default function Dashboard() {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const componentt = useParams().componentt || "Home";

  const [name, setName] = useState(null);
  const [uid, setUid] = useState(null);
  const [usr, setUsr] = useState(null);
  const [pets, setPets] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        setUsr(user);
        console.log(user);
        db.collection("user")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (user.emailVerified && !doc.exists) {
              db.collection("user")
                .doc(user.uid)
                .set({
                  name: user.displayName || "Guest",
                  profileCompleted: false,
                });
            }
            if (doc.exists) setName(doc.data().name);
            else setName(user.displayName);
            console.log(name);
          })
          .catch((err) => console.error(err));
        db.collection("user")
          .doc(user.uid)
          .collection("pets")
          .onSnapshot((docs) => {
            var temp = [];
            docs.forEach((doc) => {
              temp.push(doc.data());
            });
            setPets(temp);
          });
      }
    });
  }, []);

  const logout = () => {
    auth
      .signOut()
      .then(function () {
        console.log("Sign-out successful");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toLoginPage = () => {
    window.location =
      window.location.protocol + "//" + window.location.host + "/" + "login";
  };

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <AppBar position="absolute">
        <Navbar className="newnavbar" expand="xl">
          <Navbar.Brand href="#home">
            <img
              className="mainlogoonnav mb-2"
              style={{ width: "130px", height: "33px" }}
              src={MainLogo}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mr-auto"
              style={{
                position: "relative",
                zIndex: "999",
                backgroundColor: "#ffffff",
              }}
            >
              <Nav.Link className="newnavitems home_nav" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="newnavitems">
                <div className="dropdown">
                  <button className="ddbtn" type="button" onClick={handleShow}>
                    My Pets
                  </button>
                </div>
              </Nav.Link>
              <Modal
                show={show}
                onHide={handleClose}
                style={{ marginTop: "40px" }}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>MY PETS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ padding: "10px" }} className="form-check">
                    {pets
                      ? pets.map((pet) => (
                          <div>
                            <div className="row">
                              <div className="col-2">
                                <img className="petimage" src={pet.url} />
                                <p
                                  className="ml-4"
                                  style={{
                                    textAlign: "center",
                                    color: "black",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {pet.name}{" "}
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="petdetails">
                                  Category: {pet.category}
                                  <br />
                                  Age: {pet.age} years <br /> Breed: {pet.breed}
                                </p>
                              </div>
                            </div>
                            <hr
                              style={{ marginTop: "0px", paddingTop: "0px" }}
                            />
                          </div>
                        ))
                      : null}
                    <Link to="/Addpet/">
                      <div className="row">
                        <GrAdd
                          className="ml-4 mr-3"
                          style={{ fontSize: "30px" }}
                        />
                        <h6 className="mt-1 mr-3">Add a Pet</h6>
                      </div>
                    </Link>
                  </div>
                </Modal.Body>
              </Modal>
              <Nav.Link className="newnavitems" href="/Wishlist/">
                Wishlist
              </Nav.Link>
              <Nav.Link className="newnavitems" href="/Appointment/">
                Vets
              </Nav.Link>
              <Nav.Link className="newnavitems" href="/allappointments/">
                Appointments
              </Nav.Link>
            </Nav>
            <div className="row nfn">
              <input
                type="text"
                placeholder=" Search Pet food, special toys and many more...."
                className="newnavsearchbox align-self-center"
              />
              <div className="mr-4">
                <div>
                  <button
                    type="button"
                    className="togglebtn"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <MdAccountCircle
                      style={{
                        fontSize: "33px",
                        color: "#36a9cc",
                        backgroundColor: "#ffffff",
                      }}
                    />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    style={{ minWidth: "250px", height: "auto" }}
                  >
                    <div className="row mt-2 ml-4">
                      <MdAccountCircle
                        style={{
                          fontSize: "33px",
                          color: "#36a9cc",
                          backgroundColor: "#ffffff",
                        }}
                      />
                      <div className="ml-4 mb-3">
                        <h6>{usr ? name : "Guest User"}</h6>
                        <p
                          style={{
                            fontSize: "10px",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          {usr ? usr.email : null}
                        </p>
                      </div>
                    </div>
                    <div className="row ml-4">
                      <HiSwitchHorizontal
                        style={{ fontSize: "37px" }}
                        className="mr-4"
                      />

                      <Link to="/editProfile">
                        <h6 className="mt-1">Edit Profile</h6>
                      </Link>
                    </div>
                    <hr style={{ margin: "12px 10px" }} />
                    {usr ? (
                      <button onClick={logout} className="logoutbtn">
                        Log Out
                      </button>
                    ) : (
                      <button onClick={toLoginPage} className="logoutbtn">
                        Log In
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-1">Profile</p>
              </div>
              <div className="mr-4">
                <Link to="/Cart/">
                  <MdShoppingCart
                    style={{ fontSize: "33px", color: "#979797" }}
                  />
                </Link>
                <p className="mt-1">Cart</p>
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </AppBar>

      <div className={classes.container}>
        {componentt == "Home" ? (
          <DashboardClient />
        ) : componentt == "myPets" ? (
          <MyPets />
        ) : componentt == "Cart" ? (
          <Cart />
        ) : componentt == "Wishlist" ? (
          <Wishlist />
        ) : componentt == "Addpet" ? (
          <Addpet />
        ) : componentt == "ShopProducts" ? (
          <ShopProducts />
        ) : componentt == "VetProfile" ? (
          <VetProfile />
        ) : componentt == "ShopPage" ? (
          <ShopPage />
        ) : componentt == "Cart2" ? (
          <Cart2 />
        ) : componentt == "Appointment" ? (
          <Appointment />
        ) : componentt == "editProfile" ? (
          <EditProfile />
        ) : componentt == "vetconfirmation" ? (
          <VetConfirmation />
        ) : componentt == "allappointments" ? (
          <AllAppointments />
        ) : componentt == "privacyPolicy" ? (
          <PrivacyPolicy />
        ) : componentt == "orderCompleted" ? (
          <OrderCompleted />
        ) : (
          <Home />
        )}
      </div>
      <Footer />
    </div>
  );
}
