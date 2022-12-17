import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import "./appointment.css";
import vetpic from "../pictures/image 36.png";
import { Form, Button } from "react-bootstrap";
import dog from "../pictures/dog.png";
import rabbit from "../pictures/rabbit.png";
import cat from "../pictures/cat.png";
import { Link } from "react-router-dom";

const login =
  window.location.protocol + "//" + window.location.host + "/" + "login/";

const useStyles = makeStyles((theme) => ({
  vet: {
    // position: "absolute",
    // width: "141px",
    // height: "23px",
    // left: "130px",
    // top: "238px",
    // fontfamily: "Roboto",
    // fontstyle: "normal",
    // fontweight: "500",
    // fontsize: "20px",
    // lineheight: "23px",
    // color: "#000000",
  },

  image: {
    // position: "absolute",
    // width: "94px",
    // height: "94px",
    // left: "19px",
    // top: "238px",
    // background: "url(Rectangle60.png)",
    // background: "#C4C4C4",
    // borderradius: "3px",
  },

  address: {
    // position: "absolute",
    // width: "206px",
    // height: "15px",
    // left: "130px",
    // top: "288px",

    // fontfamily: "Roboto",
    // fontstyle: "normal",
    // fontweight: "500",
    // fontsize: "13px",
    // lineheight: "15px",

    color: "#B5B5B5",
  },

  open: {
    // position: "absolute",
    // width: "31px",
    // height: "15px",
    // left: "130px",
    // top: "310px",

    // fontfamily: "Roboto",
    // fontstyle: "normal",
    // fontweight: "500",
    // fontsize: "13px",
    // lineheight: "15px",

    color: "#B5B5B5",
  },

  dist: {
    // position: "absolute",
    // width: "34px",
    // height: "14px",
    // left: "354px",
    // top: "314px",
    // fontfamily: "Roboto",
    // fontstyle: "normal",
    // fontweight: "normal",
    // fontsize: "12px",
    // lineheight: "4px",
    /* identical to box height */
    // color: "#000000",
  },
}));

export default function Appointment() {
  const classes = useStyles();
  const [vets, setVets] = useState(null);

  const [usr, setUsr] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location = login;
      } else {
        setUsr(user);
        db.collection("user")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              var city = doc.data().city;
              db.collection("vet")
                .where("city", "==", city)
                .get()
                .then((docs) => {
                  var temp = [];
                  docs.forEach((vet) => {
                    temp.push({ ...vet.data(), key: vet.id });
                  });
                  setVets(temp);
                })
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
      }
    });
  });
  return (
    <div>
      <h3 className="apptitle">VET APPOINTMENTS</h3>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3 left_appflex mb-3">
                <h6>Use Filters</h6>
                <button>Visit Clinic</button>
                <button>Home Visit</button>
                <button>Video Call</button>
                <button>Chat</button>
          </div>
          <div className="col-12 col-lg-9">
          {vets
            ? vets.map((vet) => (
              <div className="col-12 apptile mb-3">
                <div className="row">
                  <div className="col-5 col-sm-3">
                    <img className="apptile_img" src={vet.imgUrl} alt="" />
                  </div>
                  <div className="col">
                    <div className="row mt-2">
                      <span className="vetname">{vet.Name}</span>
                      <span className="closevet mr-3 ml-3">({vet.experience} years experience)</span>
                    </div>
                    <div className="row mt-1 mb-0">
                      <p className="vetClinicName">{vet.clinicName}</p>
                    </div>
                    <div className="row mt-0">
                      <p className="clinicAddress">{vet.Address}</p>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 col-sm-7">
                        <div className="row align-items-center">
                          <p className="open mr-2">Open</p>
                          <p className="closevet">Closes 9PM</p>
                        </div>
                      </div>
                      <div className="col-12 col-sm-5">
                        <Link to={"/VetProfile/"+vet.key}>
                                <button 
                                className="bookappointment">
                                  Book Appointment
                                </button>
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            ))
          :null}
          </div>
        </div>
      </div>
    </div>
  );
}
