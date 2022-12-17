import React, { useState, useEffect } from "react";

/*import Rating from "@material-ui/lab/Rating";*/
import "../Admin/Admin.css";
import "./shoppage.css";
import { db, auth } from "../../firebase";
import SquareCard from "../dashboardclient/SquareCard";
import "../client/newProductDeatils.css";
import Carousel from "react-elastic-carousel";
import Product from "../pictures/image 15.png";
import Productdescription from "../pictures/image 35.png";
// import BestSellers from "../dashboardclient/BestSellers";
import { useParams } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import { emailConfig } from "../../sendMail";
import { init } from "emailjs-com";
init(emailConfig.userId);

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 240, itemsToShow: 1 },
  { width: 550, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];

const styles = {
  carouselroot: {
    padding: " 0px !important",
  },
};

const ShopPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [paymentMode, setPaymentMode] = useState(null);
  const [newDeliveryAddress, setNewDeliveryAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const [info, setInfo] = useState(null);
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);
  const [uid, setUid] = useState(null);
  const { productId, subComponent } = useParams();
  const [confirmShow, setConfirmShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [num, setNum] = useState(0);

  const decrease = () => {
    if (num > 0) {
      setNum(num - 1);
    } else {
      setNum(0);
    }
  };
  const increase = () => {
    setNum(num + 1);
  };
  const [showreadmore, setShowreadmore] = useState(false);
  const showfunction = () => {
    if (showreadmore == false) {
      setShowreadmore(true);
    } else {
      setShowreadmore(false);
    }
  };
  const Box = () => {
    return (
      <p>
        biscuits makes treat time both nutritious and delicious. loaded with
        rich flavours from farm-fresh chicken and other high-quality human-grade
        ingredients
      </p>
    );
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        db.collection("user")
          .doc(user.uid)
          .get()
          .then((doc) => {
            setUserInfo(doc.data());
          });
      }
    });
    db.collection("items")
      .doc(subComponent)
      .collection("products")
      .doc(productId)
      .get()
      .then((doc) => {
        setInfo(doc.data().details);
        console.log(doc.data().details)
        console.log(productId)
        // setTotalPrice(doc.data().details.cost)
      });
  }, [qty]);

  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);

  const handleClose2 = () => {
    setShoww(false);
    setConfirmShow(true);
  };
  const handleShow2 = () => {
    setShow(false);
    setShoww(true);
  };

  /* send email function */

  const sendEmail = (obj) => {
    emailjs
      .send(emailConfig.serviceId, emailConfig.confirmOrderTemplate, obj)
      .then((res) => {
        console.log("SUCCESS!", res.status, res.text);
      })
      .catch((err) => console.log("FAILED...", err));
  };

  /* send email function */

  const addToCart = () => {
    var user = auth.currentUser;
    if (user) {
      db.collection("user")
        .doc(user.uid)
        .collection("cart")
        .doc(productId)
        .set({
          ...info,
          key: productId,
          units: 1
        })
        .then(() => alert("Product Added to Cart"));
    } else {
      prompt("Need to login");
    }
  };

  const addToWishlist = () => {
    var user = auth.currentUser;
    if (user) {
      db.collection("user")
        .doc(user.uid)
        .collection("wishlist")
        .doc(productId)
        .set({
          ...info,
          key: productId,
          units: 1
        })
        .then(() => alert("Product Added to Wishlist"));
    } else {
      prompt("Need to login");
    }
  };

  const handleConfirmClose = () => {
    setConfirmShow(false);
    // window.location= "demo"
  };

  const confirmOrder = () => {
    setTotalPrice(
      qty * Number(info.cost) * 1.3 > 300
        ? qty * Number(info.cost) * 1.3
        : qty * Number(info.cost) * 1.3 + 150
    );

    /* timestamp*/
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;

    db.collection("user")
      .doc(uid)
      .collection("pastOrders")
      .add({
        ...info,
        productId: productId,
        orderedOn: today,
        total: totalPrice,
        numberOfUnits: qty,
      })
      .then((doc) => {
        db.collection("All_Orders")
          .doc(doc.id)
          .set({
            ...info,
            productId: productId,
            orderedOn: today,
            total: totalPrice,
            customerId: uid,
            numberOfUnits: qty,
          });
        handleClose2();
        var email_details = {
          order_id: doc.id,
          message: `total: Rs. ${totalPrice}....  \nno. of units: ${qty}....  Product: ${info.name}`,
          to_email: userInfo.mail,
          to_name: userInfo.name,
        };
        sendEmail(email_details);
      });
  };

  return (
    <div>
      
      <div className="productDetails_title">
        <p>{info ? info.name : null}</p>
        <p>Available in multiple colors</p>
      </div>
      <div className="productDetails_flex">
        <div className="productDetails_insideflex1">
          {info ? info.urlList.map((m)=>( 
            <img src={m} alt="imageofproduct" />
          )):null}
          
         {/* <img src={Product} alt="imageofproduct" />
          <img src={Product} alt="imageofproduct" />
          <img src={Product} alt="imageofproduct" />
  <img src={Product} alt="imageofproduct" />*/}
        </div>

        <div className="productDetails_insideflex2">
          <img src={info? info.url:null} alt="imageofproduct" />
        </div>
        <div className="productDetails_insideflex3">
          <p className="description">{
            info ? info.ingredients : null}
          </p>
          <span>
         {/*   <p onClick={showfunction}>Read More</p>
            <p>{showreadmore && <Box />}</p>*/}
          </span>
          <p>Size:</p>

          <div className="row justify-content-center mb-1">
            {info?(info.size.map((s)=>
             <button className="row-btn">{s}</button>
            )):null}
            {/*<button className="row-btn">800 gm</button>
            <button className="row-btn">1 kg</button>
            <button className="row-btn">2 kg</button>*/}
          </div>
          {/*<span>
            <button
              style={{
                background: "#FFFFFF",
                border: " 1px solid #C4C4C4",
                boxSizing: "border-box",
                borderRadius: "2px 0px 0px 2px",
              }}
              onClick={decrease}
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
              {num}
            </button>
            <button
              style={{
                background: "#FFFFFF",
                border: " 1px solid #C4C4C4",
                boxSizing: "border-box",
                borderRadius: "2px 0px 0px 2px",
              }}
              onClick={increase}
            >
              +
            </button>
          </span>
          */}<div className="row justify-content-center align-items-center">
            <p className="acprize">Rs. {info ? info.cost :null}</p>
            <p className="cprize ml-4">Rs. {info ? info.mrp :null}</p>
          </div>
          <button onClick={addToCart} className="cartbutton">
            Add to Cart
          </button>
          {/* .........................rough............ */}

          <p className="checkdeliver">Check if we Deliver to your Pincode</p>
          <span>
            <input type="text" placeholder="ENTER PINCODE" />
            <button className="checkbutton">CHECK</button>
          </span>
        </div>
      </div>
      <hr />
      <div className="productDetails_description_flex">
        <div className="productDetails_description_insideflex1">
          <p className="productdescriptiontitle">PRODUCT DESCRIPTION</p>
          <p>{info ? info.description :null}</p>
         {/* <ul className="ul">
            <li>Cookies for dogs</li> <br />
            <li> Suitable for all dogs</li> <br />
            <li> Made from rice and chickpea flour</li> <br />
            <li> Made with real chicken</li> <br />
            <li> Treats should always be given in moderation</li> <br />
            <li> Always have fresh water available for your pet</li> <br />
            <li>
              Never feed above recommended quantities unless prescribed by a vet
            </li>
            <br />
            <li> Always check the ingredient label for possible allergy</li>{" "}
            <br />
        </ul> */}
        </div>
        <div className="productDetails_description_insideflex2">
          <img src={Productdescription} alt="hry" />
        </div>
      </div>

      {/*<h2 className="mt-4">DOG ESSENTIALS</h2>
*/}
      <div
        className="carousel-styling"
        style={{ justifyContent: "center", paddingBottom: "40px" }}
      >
       {/* <Carousel breakPoints={breakPoints}>
          <item>
            <SquareCard />
          </item>
          <item>
            <SquareCard />
          </item>
          <item>
            <SquareCard />
          </item>
          <item>
            <SquareCard />
          </item>
        </Carousel>
            */}      </div>
    </div>
    // <div>
    //   {info?(
    //     <div className="carouselanddetails">
    //     <div>
    //       <img
    //         src={info.url}
    //         height="200px"
    //         width="180px"
    //         alt= {info.name}
    //       />
    //     </div>
    //     <div className="details">
    //       <p
    //         className="openedproductname"
    //         style={{ fontSize: 20, fontWeight: 500, marginBottom: "5px" }}
    //       >
    //         {info.name}
    //       </p>
    //       <p
    //         className="openedproductname"
    //         style={{ fontSize: 19, fontWeight: 500, marginBottom: "10px" }}
    //       >
    //         Rs {info.cost}
    //       </p>
    //       <hr style={{ color: "rgba(0,0,0,0.1" }} />

    //       {/*<Rating
    //         style={{ marginTop: "20px" }}
    //         name="read-only"
    //         value={value}
    //         readOnly
    //       />*/}
    //       <p style={{ fontSize: 14, marginTop: "20px" }}>
    //         {info.description}
    //         <br /> <div>Product Type: {subComponent} <br />
    //               {info.ingriedients}
    //         </div>

    //       </p>
    //       <button onClick={addToCart} >Add to Cart</button>
    //       <button onClick={addToWishlist} >Add to Wishlist</button>
    //       <button onClick={handleShow1}>Buy Now</button>
    //     </div>

    //   <hr style={{ color: "rgba(0,0,0,0.1" }} />

    //   <Modal show={confirmShow} centered>
    //     <Modal.Header >
    //       <Modal.Title>Order Placed</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>Woohoo, your order has been placed</Modal.Body>
    //     <Modal.Footer>
    //       <Link to='/Home'>
    //       <Button variant="secondary">
    //         Okay
    //       </Button>
    //       </Link>
    //     </Modal.Footer>
    //   </Modal>

    //   <Modal show={show} onHide={handleClose1} centered>
    //       <Modal.Header closeButton>
    //         <Modal.Title>Order Item</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <h3>Order Details</h3>
    //         <div className="row">
    //           <div className="col-12 col-sm-6 mt-5" style={{textAlign: "center"}}>
    //             <img
    //             src={info.url}
    //             height="200px"
    //             width="90%"
    //             alt= {info.name}></img>
    //           </div>
    //           <div className="col-12 col-sm-6">
    //             <div className="row mt-3 mb-3 justify-content-center">
    //               <h5><strong>{info.name}</strong></h5>
    //             </div>
    //             <div className="row">
    //               <strong className="col-8">Quantity</strong>
    //               <input className="col-4" type="number" min="1" max={info.quantity} defaultValue="1" onChange={(e)=>{
    //                 setTotalPrice(Number(e.target.value)*Number(info.cost)*1.3)
    //                 setQty(Number(e.target.value))

    //                 }}></input>
    //             </div>
    //             <div className="row">
    //               <strong className="col-8">Cost of 1 Product</strong>
    //               <p>Rs. {info.cost}</p>
    //             </div>
    //             <div className="row">
    //               <strong className="col-8">Cost of Products</strong>
    //               <p>Rs. {info.cost*qty}</p>
    //             </div>
    //             <div className="row">
    //               <strong className="col-8">GST</strong>
    //               <p>Rs. {0.3*info.cost*qty}</p>
    //             </div>
    //             <div className="row">
    //               <strong className="col-8">Delivery Charges</strong>
    //               <p>Rs. {1.3*info.cost*qty>300 ? 0: 150}</p>
    //             </div>
    //             <div className="row">
    //               <strong className="col-8">Total Cost</strong>
    //               <p>Rs. {1.3*info.cost*qty>300 ? 1.3*info.cost*qty: 150+ 1.3*info.cost*qty}</p>
    //             </div>
    //           </div>
    //         </div>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <button onClick={handleShow2} className="pink_out">Next</button>
    //         <button onClick={handleClose1} className="pink_out">Cancel</button>
    //       </Modal.Footer>
    //   </Modal>

    //   <Modal size="lg" show={showw} onHide={()=>{setShoww(false)}} centered>
    //       <Modal.Header closeButton>
    //         <Modal.Title>Order Item</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <div className="container">
    //           <div className="row mb-4">
    //             <h6 className="col-4"><strong>Delivery Address: {userInfo? userInfo.address: null} </strong></h6>
    //             <h6>Another Address</h6>
    //             <input type="text" placeholder={userInfo? userInfo.address: null} onBlur={(e)=>{e.target.value.trim!=" "? setNewDeliveryAddress(e.target.value): setNewDeliveryAddress(userInfo.address)}} />
    //           </div>
    //           <div>
    //             <h5><strong>Payment Options</strong></h5>
    //             <Form>

    //               <select onChange={(e)=>{setPaymentMode(e.target.value)}}>
    //                 <option value="nb" >Net Banking</option>
    //                 <option value="cod" >Cash on Delivery</option>
    //                 <option value="upi" >UPI Payment</option>
    //                 <option value="card" >Debit/Credit/ATM Card</option>
    //               </select>

    //             </Form>
    //           </div>
    //         </div>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <button className="pink_out" onClick={confirmOrder} >Confirm Order</button>
    //         <button className="pink_out" onClick={()=>{setShoww(false)}}>Cancel</button>
    //       </Modal.Footer>
    //   </Modal>

    //   </div>

    //   ): null}

    // </div>
  );
};
export default ShopPage;
