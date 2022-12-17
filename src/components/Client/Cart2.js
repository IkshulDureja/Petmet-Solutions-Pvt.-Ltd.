import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import "./cart.css";
import "./cart2.css";
import AddIcon from "@material-ui/icons/Add";
import Food from "../pictures/image 360.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Cart2 = () => {
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          marginTop: " 90px",
        }}
      >
        <span style={{ color: "#36A9CC" }}>
          CART ---------------------------
        </span>
        <span style={{ color: "#36A9CC" }}>
          ADDRESS ---------------------------
        </span>
        <span style={{ color: "#FF5352" }}>PAYMENT</span>
      </p>
      <h2 style={{ marginTop: "26.67px" }}>SELECT DELIVERY ADDRESS</h2>
      <div className="cart2_outerflex">
        <div className="cart2_leftflex">
          <div className="cart2_addresscard">
            <div>
              <p className="defaulttag">DEFAULT</p>
              <p className="cart2_name">
                <FormControlLabel value="female" control={<Radio />} />
                Nishant Jindal
              </p>
            </div>
            <div style={{ marginLeft: "46px" }}>
              <p>Shnati Nagar, Jungle Baag, Kitchlu Nagar</p>
              <p>131152</p>
              <p>9814368838</p>
            </div>

            <span
              style={{
                justifyContent: "right",
                marginLeft: "auto",
              }}
            >
              <button className="cart2_removebutton">REMOVE</button>
              <button className="cart2_removebutton">EDIT</button>
            </span>
          </div>
          <div className="cart2_addaddress">
            <p className="cart2_addaddresstext">
              <AddIcon />
              Add New Address
            </p>
          </div>
        </div>
        <div className="cart2_rightflex">
          <div className="pricedetails">
            <p className="headingofflex2">PRICE DETAILS (3 ITEMS)</p>
            <br />
            <hr />
            <div className="label_price_flex">
              <div className="amount">Total MRP</div>
              <div className="price_part amount">₹435 </div>
            </div>
            <div className="label_price_flex">
              <div className="amount">Discount on MRP</div>
              <div className="price_part amount">-₹435 </div>
            </div>
            <div className="label_price_flex">
              <div className="amount">Coupon Discount</div>
              <div className="price_part amount">-₹435 </div>
            </div>
            <hr style={{ color: "black" }} />
            <div className="label_price_flex">
              <div style={{ fontWeight: "500" }} className="amount">
                Total Amount
              </div>
              <div style={{ fontWeight: "500" }} className="price_part amount">
                ₹435{" "}
              </div>
            </div>
          </div>
          <button type="button" class="placeorderbutton">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart2;
