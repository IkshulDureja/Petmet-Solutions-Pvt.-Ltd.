import React from "react";
import Dog from "../pictures/dog.png";
import "./squarecard.css";
import { Button, Card } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import { db, auth } from "../../firebase";

// const addToWishlist = () => {
//   var user = auth.currentUser;
//   if (user) {
//     db.collection("user")
//       .doc(user.uid)
//       .collection("wishlist")
//       .doc(productId)
//       .set({
//         ...info,
//         key: productId,
//       })
//       .then(() => alert("Product Added to Wishlist"));
//   } else {
//     prompt("Need to login");
//   }
// };

const SquareCard = (props) => {
  return (
    <div>
      {/* <div className="personalthumb">
        <div>
          <img
            style={{ backgroundColor: "#f5f5f5" }}
            className="dishpicture"
            src={props.image}
          />
        </div>


           

        <p className="dishnames">HUFT Drizzle Chicken Liver Dog Biscuits</p>
        <div className="priceofproduct">₹250</div>
        <Button className="btn btn-block mt-4 m-2">Add to Cart</Button>
      </div> */}
      <Card className="outCard">
        <div className="crdImg">
          <Card.Img src={Dog} className="dishImg" />
          <span className="iconspan">
            {/* <button onClick={addToWishlist} className="cartbutton"> */}
            <BsHeart className="ic" />
            {/* </button> */}
          </span>
        </div>
        <div>
          <Card.Title style={{ fontWeight: "bold" }}>
            HUFT Drizzle Buddy Raincoat- Purpule
          </Card.Title>
          <div className="row justify-content-center mb-1"></div>
          <div className="row justify-content-center align-items-center">
            <p className="acprize">Rs. 950</p>
            <p className="cprize ml-4">Rs. 1250</p>
          </div>
          <button
            className="btn btn-block btn-sm"
            style={{
              color: "#ffffff",
              backgroundColor: "#36a9cc",
              borderRadius: "3px",
            }}
          >
            Add to Cart
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SquareCard;
