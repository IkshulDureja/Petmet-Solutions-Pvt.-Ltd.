import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import "./cart.css";
import "./cart2.css";
import axios from "axios";
import paymentRazorpay from "./payment";
import Food from "../pictures/image 360.png";
import Cart2 from "./Cart2";
import {Form, Modal} from 'react-bootstrap';
import AddIcon from "@material-ui/icons/Add";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const login =
  window.location.protocol + "//" + window.location.host + "/" + "login/";

const CartComponent = (props) => {
  const [wish, setWish] = useState(null);
  const [total, setTotal] = useState(0);
  const [code, setCode] = useState("no_promo");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [inTotal, setInTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [useWallet, setUseWallet] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [showAddress, setShowAddress ] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const [promo, setPromo] = useState({
    description: "default promo code, 5% cashback to wallet+0 discount",
    discount: "0",
    discountLowerLimit: "0",
    discountUpperLimit: "0",
    reUsable: true,
    walletCashback: ".05",
    walletCashbackMaxima: "150",
  });

  const handleCloseMain = () => {
    setShowMain(false)
  }

  const handleShowMain = () => {
    setShowAddress(false)
    setShowMain(true)
  }

  const handleShowAddress = () => {
    setShowMain(false)
    setShowAddress(true)
  }

  const handleCloseAddress = () => {
    setShowAddress(false)
  }

  const handleShowSummary = () => {
    setShowMain(false)
    setShowAddress(false)
    setShowSummary(true)
  }

  const handleCloseSummary = () => {
    setShowSummary(false)
  }

  const [uid, setUid] = useState(null);
  const proLink = (_id, category) => {
    window.location =
      window.location.protocol +
      "//" +
      window.location.host +
      "/" +
      "ShopPage" +
      "/" +
      category +
      "/" +
      _id;
  };

  
const addToWishlist = () => {
  var user = auth.currentUser;
  if (user) {
    db.collection("user")
      .doc(user.uid)
      .collection("wishlist")
      .doc(props._id)
      .set({
        ...props.info,
        key: props._id,
        units: 1
      })
      .then(() => alert("Product Added to Wishlist"));
  } else {
    prompt("Need to login");
  }
};

  const retrieveOrder = async () => {
    var endPoint = "https://petmet.co.in/payment/order";

    var products = [];
    wish.forEach((pro) => {
      products.push({
        category: pro.category,
        productId: pro.key,
        units: pro.units,
      });
    });

    var reqBody = {
      uid: uid,
      deliveryAddress: deliveryAddress,
      useWallet: useWallet,
      promo: code,
      mail: user.mail || user.email,
      products: products,
    };

    try {
      var response = await axios.post(endPoint, reqBody);
      console.log(response);
      paymentRazorpay(response);
    } catch (err) {
      console.error(err);
    }
  };

  const delPro = (key) => {
    db.collection("user")
      .doc(uid)
      .collection("cart")
      .doc(key)
      .delete()
      .then(() => {
        console.log("deleted");
      });
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUid(user.uid);
        console.log(uid);
        db.collection("user")
          .doc(user.uid)
          .collection("cart")
          .get()
          .then((docs) => {
            var temp = [];
            var net = 0;
            docs.forEach((doc) => {
              temp.push({ ...doc.data() });
              if (doc.data().cost) {
                net += Number(doc.data().cost) * doc.data().units;
              }
            });
            setWish(temp);
            setTotal(net);
            setInTotal(net);
            discount(promo);
          });

        db.collection("user")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) 
            {
              var temp=doc.data()
              setUser(temp)
              setDeliveryAddress({
                address: temp.address,
                phone: temp.phone,
                name: temp.name || temp.firstName + temp.lastName,
                zip: temp.zip,
                city: temp.city,
                state: temp.state,
                default: true,
              })
            };
          });
      }
    });
  }, []);

  const changeQuant = (ind, cost, i) => {
    if (wish[ind].units > 1) {
      var temp = wish;
      var net = total;
      var net1 = inTotal;
      temp[ind].units += i;
      net += i * cost;
      net1 += i * cost;
      setWish(temp);
      setTotal(net);
      setInTotal(net1);
    } else if (wish[ind].units == 1) {
      if (i == -1) {
        delPro(wish[ind].key);
        wish.splice(ind, 1);
      }
      var temp = wish;
      var net = total;
      var net1 = inTotal;
      temp[ind].units += i;
      net += i * cost;
      net1 += i * cost;
      setWish(temp);
      setTotal(net);
      setInTotal(net1);
    }
  };

  const loadPromo = (code) => {
    db.collection("promo")
      .doc(code)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setPromo(doc.data());
          discount(doc.data());
        }
      });
  };

  const discount = (promo) => {
    console.log(total,inTotal)
    var net = inTotal;
    setTotal(inTotal)
    if (user && !user.usedPromo.includes(code)) {
      if (net > Number(promo.discountLowerLimit)) {
        var inDis = Number(promo.discount) * net;
        net -= Math.min(inDis, Number(promo.discountUpperLimit));
        setTotal(net);
        setCouponDiscount(Math.min(inDis, Number(promo.discountUpperLimit)));
      }
    }
    else if (user)
      alert(`${code} can't be used again. Try another one.`)
  };

  return (
    <div style={{ backgroundColor: "#e5e5e5", marginTop:"-228px",paddingTop:"100px" }}>
      {/* <p
        className="toppath"
        style={{
          textAlign: "center",
        }}
      >
        <span style={{ color: "#36A9CC" }}>CART ---------------------</span>
        <span style={{ color: "#FF5352" }}>ADDRESS ------------------</span>
        <span style={{ color: "#FF5352" }}>PAYMENT</span>
      </p> */}
      <div style={{ marginTop: "-30px" }} className="bothflexbox">
        <div className="flexbox11">
          {/* .................... */}
          {wish
            ? wish.map((wi, ind) => (
                <div className="cartproductcard mb-4">
                  <div className="embedded_cartproductcard">
                    <img className="cartimage" src={wi.url} alt="khaana" />
                    <div className="columnembeddedcard">
                      <p className="amount">{wi.name}</p>

                      <p style={{ marginTop: "6.3px" }} className="self">
                        Size: {wi.size}
                      </p>

                      <span className="incresedecreasespan">
                        <button
                          style={{
                            background: "#FFFFFF",
                            border: " 1px solid #C4C4C4",
                            boxSizing: "border-box",
                            borderRadius: "2px 0px 0px 2px",
                          }}
                          className="cart_decreasebutton"
                          onClick={() => {
                            changeQuant(ind, Number(wi.cost), -1);
                          }}
                        >
                          -
                        </button>
                        <button
                          style={{
                            background: " #EBFAFF",
                            border: "1px solid #C4C4C4",
                            boxSizing: "border-box",
                          }}
                        >
                          {wi.units}
                        </button>
                        <button
                          style={{
                            background: "#FFFFFF",
                            border: " 1px solid #C4C4C4",
                            boxSizing: "border-box",
                            borderRadius: "2px 0px 0px 2px",
                          }}
                          className="cart_decreasebutton"
                          onClick={() => {
                            changeQuant(ind, Number(wi.cost), 1);
                          }}
                        >
                          +
                        </button>
                      </span>
                    </div>
                    <div className="embeddedflexforprices">
                      <p style={{ fontWeight: "500" }} className="self2 amount">
                        ₹{wi.cost}
                      </p>
                      <p className="self2 "></p>
                    </div>
                  </div>
                  <hr />
                  <span>
                    <button className="cartremovebuttonn">REMOVE</button>
                    <button className="linebtwbutton">|</button>
                    <button onClick={addToWishlist} className="cartremovebuttonn">
                      ADD TO WISHLIST
                    </button>
                  </span>
                </div>

                // ......................................productcardends....................
              ))
            : null}
        </div>

        {/* .............................. */}
        <div className="flexbox22">
          <div className="coupons">
            <p className="headingofflex2">
              COUPONS
              <hr />
            </p>

            <div className="label_price_flex">
              <div className="amount applycouponstext">
                <input
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              </div>
              <div className=" amount">
                <button
                  type="button"
                  className="applybuttonn"
                  onClick={() => {
                    loadPromo(code);
                  }}
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
          {/* ...................................... */}

          {/* ......................................................... */}
          <div className="pricedetails">
            <p className="headingofflex2">PRICE DETAILS (3 ITEMS)</p>
            <br />
            <hr />
            <div className="label_price_flex">
              <div className="amount">Total MRP</div>
              <div className="price_part amount">₹{inTotal} </div>
            </div>
            {/* <div className="label_price_flex">
              <div className="amount">Discount on MRP</div>
              <div className="price_part amount">-₹435 </div>
            </div> */}
            <div className="label_price_flex">
              <div className="amount">Coupon Discount</div>
              <div className="price_part amount">-₹{couponDiscount} </div>
            </div>
            <hr style={{ color: "black" }} />
            <div className="label_price_flex">
              <div style={{ fontWeight: "500" }} className="amount">
                Total Amount
              </div>
              <div style={{ fontWeight: "500" }} className="price_part amount">
                ₹{total}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="placeorderbutton"
            onClick={handleShowMain}
          >
            PLACE ORDER
          </button>
        </div>
        {/* ................................... */}
      </div>
      
      <Modal size="lg" show={showMain} onHide={handleCloseMain} centered>
        <Modal.Header style={{borderColor:"black"}} closeButton>
          <Modal.Title style={{color:"black"}}>SELECT DELIVERY ADDRESS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart2_leftflex">
            <div className="cart2_addresscard">
              <div>
                <p className="defaulttag">DEFAULT</p>
                <p className="cart2_name">
                  <FormControlLabel value="female" control={<Radio />} />
                  {user? user.name || user.firstName + user.lastName:"loading"}
                </p>
              </div>
              <div style={{ marginLeft: "46px" }}>
                <p>{user? user.address:"loading"}</p>
                <p>{user? user.zip:"loading"}</p>
                <p>{user? user.phone:"loading"}</p>
              </div>
              <span style={{ justifyContent: "right", marginLeft: "auto" }}>
                {/* <button className="cart2_removebutton">REMOVE</button> */}
                <button className="cart2_removebutton" onClick={handleShowAddress}>EDIT</button>
              </span>
            </div>
            <div className="cart2_addaddress" style={{cursor:"pointer"}}>
              <p className="cart2_addaddresstext" onClick={handleShowAddress}>
                <AddIcon />
                Add New Address
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{border:"none"}}>
          <button className="cartModalButtons" onClick={handleCloseMain}>
            Cancel
          </button>
          <button className="cartModalButtons" onClick={handleShowSummary}>
            Next
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddress} onHide={handleCloseAddress} centered>
        <Modal.Header style={{borderColor:"black"}} closeButton>
          <Modal.Title style={{color:"black"}}>ADD NEW ADDRESS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mb-3">
              <Form.Control placeholder="Name*" onBlur={(e) => setDeliveryAddress({...deliveryAddress, name: e.target.value, default: false})}></Form.Control>
            </div>
            <div className="row mb-3">
              <Form.Control placeholder="Mobile*" onBlur={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value, default: false})}></Form.Control>
            </div>
            <div className="row mb-3">
              <Form.Control className="col-5" placeholder="Pincode*" onBlur={(e) => setDeliveryAddress({...deliveryAddress, zip: e.target.value, default: false})}></Form.Control>
              <Form.Control className="col-6 offset-1" placeholder="State*" onBlur={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value, default: false})}></Form.Control>
            </div>
            <div className="row mb-3">
              <Form.Control placeholder="Address (House no., Building, Street, Area)" onBlur={(e) => setDeliveryAddress({...deliveryAddress, address: e.target.value, default: false})}></Form.Control>
            </div>
            <div className="row mb-4">
              <Form.Control placeholder="City/District" onBlur={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value, default: false})}></Form.Control>
            </div>
            <div>
              <p className="mb-2" style={{color:"black"}}><strong>Type of address*</strong></p>
              <div className="row ml-2">
                <Form.Check 
                  type="radio"
                  label="Home"
                  name="type"
                  className="mr-4"
                  onSelect={() => setDeliveryAddress({...deliveryAddress, type: "home", default: false})}
                />
                <Form.Check 
                  type="radio"
                  label="Office"
                  name="type"
                  onSelect={() => setDeliveryAddress({...deliveryAddress, type: "office", default: false})}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{border:"none"}}>
          <button className="cartModalButtons" onClick={handleCloseAddress}>
            Cancel
          </button>
          <button className="cartModalButtons" onClick={handleShowSummary}>
            Next
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSummary} onHide={handleCloseSummary} style={{marginTop:"40px"}} centered>
        <Modal.Header style={{borderColor:"black"}} closeButton>
          <Modal.Title style={{color:"black"}}>REVIEW YOUR ORDER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="mb-3">
              <h6 style={{fontWeight:"bold",color:"black"}}>
                Shipping Details:
              </h6>
              <p>{deliveryAddress?deliveryAddress.name:user?user.name||user.firstName + user.lastName:"loading"}<br/>
              {deliveryAddress?deliveryAddress.address:user?user.address:"loading"}<br/>
              {deliveryAddress?deliveryAddress.city:user?user.city:"loading"}<br/>
              {deliveryAddress?deliveryAddress.state:user?user.state:"loading"}<br/>
              {deliveryAddress?deliveryAddress.zip:user?user.zip:"loading"}<br/>
              {deliveryAddress?deliveryAddress.phone:user?user.phone:"loading"}<br/>
              </p>
            </div>
            <div className="mb-3">
              <h6 style={{fontWeight:"bold",color:"black"}}>
                Billing Details:
              </h6>
              <p><strong>Coupons Applied: </strong>{code}<br/>
              <strong>Total MRP: </strong>{inTotal}<br/>
              <strong>Coupon Discount: </strong>{couponDiscount}<br/>
              <strong>Total Amount: </strong>{total}<br/>
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{border:"none"}}>
          <button className="cartModalButtons" onClick={handleCloseSummary}>
            Cancel
          </button>
          <button className="cartModalButtons" onClick={retrieveOrder}>
            Proceed to Payment
          </button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default function Cart() {
  const [usr, setUsr] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location = login;
      } else {
        setUsr(user);
      }
    });
  });
  return <div>{usr ? <CartComponent /> : null}</div>;
}
