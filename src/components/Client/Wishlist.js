import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import product1 from "../pictures/image 37.png";
import product2 from "../pictures/image 35.png";
import product3 from "../pictures/image 34.png";
import "./wishlist.css";
import "./cart.css";
import Carousel from "react-elastic-carousel";
import SquareCard from "./SquareCard";
import dog from "../pictures/image 29.png";
import { BsHeart } from "react-icons/bs";
import FeaturedCarousel from './featuredCarousel';

import Rectangle115 from "../pictures/Rectangle 115.png";
import Rectangle116 from "../pictures/Rectangle 116.png";
import Rectangle117 from "../pictures/Rectangle 117.png";
import Rectangle118 from "../pictures/Rectangle 118.png";
import Rectangle119 from "../pictures/Rectangle 119.png";
import Rectangle120 from "../pictures/Rectangle 120.png";
const login =
  window.location.protocol + "//" + window.location.host + "/" + "login/";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 240, itemsToShow: 1 },
  { width: 550, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];

const WishlistComponent = () => {
  const [wish, setWish] = useState(null);
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
  const delPro = (key) => {
    db.collection("user")
      .doc(uid)
      .collection("wishlist")
      .doc(key)
      .delete()
      .then(() => {
        window.location.reload();
      });
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUid(user.uid);
        db.collection("user")
          .doc(user.uid)
          .collection("wishlist")
          .get()
          .then((docs) => {
            var temp = [];
            docs.forEach((doc) => {
              temp.push({ ...doc.data(), key: doc.id, _id: doc.data().key });
            });
            setWish(temp);
            console.log(wish);
          });
      }
    });
  }, []);
  
  return (
    <div style={{ padding: "2%", marginTop: "-100px" }} className="wishlistpage">
      <h1 className="heading_wishlist">MY WISHLIST</h1>
      <div className="wishlist_mainflex">
        {wish
          ? wish.map((wi) => (
              <div className="wishlistpage_card">
                <div className="wishpage_rowflex">
                  <div className="dog_price_columnflex">
                    <img src={wi.url || product1} className="" />
                    <p className="cutpricee">
                      {wi.cost}
                      <span className="previouspricee">{"Rs. " + wi.cost}</span>
                    </p>
                  </div>
                  <div className="wishpage_columnflex">
                    <div className="wishpage_heading">
                      {/* HUFT Drizzle Buddy Raincoat- Purpule */}
                      {wi.name}
                    </div>
                    <div className="wishpage_text">
                      {/* The Heads Up For Tails Yummy In My Tummy biscuits makes
                      treat time both nutritious and delicious. loaded with rich
                      flavours. */}
                      {wi.description}
                    </div>
                    <div>
                      <div className="wishpage_rectangles">
                        <img src={Rectangle115}></img>
                        <span> </span>
                        <img src={Rectangle116}></img>
                        <span> </span>
                        <img src={Rectangle117}></img>
                        <span> </span>
                        <img src={Rectangle118}></img>
                        <span> </span>
                        <img src={Rectangle119}></img>
                        <span> </span>
                        <img src={Rectangle120}></img>{" "}
                      </div>
                    </div>
                    <span>
                      <button
                        className="buttonadd"
                        onClick={() => {
                          delPro(wi.key);
                        }}
                      >
                        Remove
                      </button>
                      <button
                        className="buttonbuy"
                        onClick={() => {
                          proLink(wi._id, wi.category);
                        }}
                      >
                        View Product
                      </button>
                    </span>
                  </div>

       {/*           <div className="iconspan3">
                    <BsHeart className="ic" />
                  </div>
                      */}       </div>
              </div>
              /* <div className="row" style={{ margin: "10px", width: "40em",backgroundColor:"#ffffff" }} className="cartproductcard">
       
<p>
  
<img
position= "absolute"
width= "146.59px"
height= "195.13px"
left= "71.1px"
top= "289.84px"
style={{marginRight: "1em"}}
className="cartproductimage"
src={wi.url || product1}
alt="productpicture"/>

<div style={{ marginLeft: "140px", color: "black" }}>


<h4 style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "500", fontSize: "22px",
lineHeight: "26px",
textAlign: "center", color: "#2B3B47"
 }}>{wi.name} </h4>


<p style={{fontFamily: "Roboto",fontStyle: "normal", fontwWight: "normal",
fontSize: "18px",
lineHeight: "21px",
color: "#000000"
}}>{wi.description} </p>
 
<p> <img src={Rectangle115}></img><span> </span>
<img src={Rectangle116}></img><span> </span>
<img src={Rectangle117}></img><span> </span>
<img src={Rectangle118}></img><span> </span>
<img src={Rectangle119}></img><span> </span>
<img src={Rectangle120}></img> </p>

 <p>
<span style={{
    width: "77.44px",
    height: "27.69px",
    left: "71.1px",
    top: "525.16px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "28px",
    lineHeight: "33px",
    color: "#FF5352",
    }}>{"Rs. " + wi.cost}
</span>
   <span>  </span>   
<span style={{

fontStyle: "normal",
fontWeight: "500",
fontSize: "20px",
lineHeight: "23px",
color: "#B5B5B5",
textDecorationLine:"line-through",
}}>{"Rs. " + wi.cost}</span>

</p>
  </div>
        </p>
        
       <br />
        <button type="button" className="buttonadd" class="btn btnapply" onClick={()=>{delPro(wi.key)}}>
          Add to cart
        </button>
        <button type="button" className="buttonbuy" class="btn btnapply" onClick={()=>{proLink(wi._id,wi.category)}}>
          Buy Now
        </button>
      </div> */
            ))
          : null}
      </div>
    </div>
  );
};

export default function Wishlist() {
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
  
  return (
    <div>
      {usr ? (
        <div>
          {" "}
          <WishlistComponent /> <FeaturedCarousel />
        </div>
      ) : null}
    </div>
  );
}
