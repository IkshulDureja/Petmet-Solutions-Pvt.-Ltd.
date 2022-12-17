import React from "react";
import SquareCard from "../dashboardclient/SquareCard";
import "./newProductDeatils.css";
import Carousel from "react-elastic-carousel";
import Product from "../pictures/image 15.png";
import Productdescription from "../pictures/image 35.png";

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

function NewProductDetails() {
  return (
    <div>
      <div className="productDetails_title">
        <p>HUFT Drizzle Buddy Raincoat- Purpule</p>
        <p>Available in multiple colors</p>
      </div>
      <div className="productDetails_flex">
        <div className="productDetails_insideflex1">
          <img src={Product} alt="imageofproduct" />
          <img src={Product} alt="imageofproduct" />
          <img src={Product} alt="imageofproduct" />
          <img src={Product} alt="imageofproduct" />
          <img src={Product} alt="imageofproduct" />
        </div>

        <div className="productDetails_insideflex2">
          <img src={Product} alt="imageofproduct" />
        </div>
        <div className="productDetails_insideflex3">
          <p className="description">
            The Heads Up For Tails Yummy In My Tummy biscuits makes treat time
            both nutritious and delicious. loaded with rich flavours from
            farm-fresh chicken and other high-quality human-grade
            ingredients,...
          </p>
          <p>Size:</p>
          {/* <span>
            <button>320gm</button>
            <button>320gm</button>
            <button>320gm</button>
            <button>320gm</button>
          </span> */}
          <div className="row justify-content-center mb-1">
            <button className="row-btn">320 gm</button>
            <button className="row-btn">800 gm</button>
            <button className="row-btn">1 kg</button>
            <button className="row-btn">2 kg</button>
          </div>
          <div className="row justify-content-center align-items-center">
            <p className="acprize">Rs. 950</p>
            <p className="cprize ml-4">Rs. 1250</p>
          </div>
          <button className="cartbutton">Add to Cart</button>
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
          <p>Features:</p>
          <ul className="ul">
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
            <li> Always check the ingredient label for possible allerg</li>{" "}
            <br />
            <li></li> <br />
            <li></li> <br />
          </ul>
        </div>
        <div className="productDetails_description_insideflex2">
          <img src={Productdescription} alt="hry" />
        </div>
      </div>

      <h2 className="mt-4">DOG ESSENTIALS</h2>

      <div
        className="carousel-styling"
        style={{ justifyContent: "center", paddingBottom: "40px" }}
      >
        <Carousel breakPoints={breakPoints}>
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
      </div>
    </div>
  );
}

export default NewProductDetails;
