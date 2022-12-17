import React from "react";
import Carousel from "react-elastic-carousel";
//import Products from "./Products.js";
import SquareCard from "./SquareCard";
import "./bestsellers.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
  { width: 240, itemsToShow: 5 },
];

// const relateditems = [
//   {
//     id: 1,
//     title: "item #1",
//     URL: "https://backend.petsutra.com/app/uploads/31-05-19/5cf117d1bc675.png",
//   },
//   { id: 2, title: "item #2" },
//   { id: 3, title: "item #3" },
//   { id: 4, title: "item #4" },
//   { id: 5, title: "item #5" },
// ];

const BestSellers = () => {
  return (
    <div className="bestsellers">
      <Carousel breakPoints={breakPoints}>
        {/* {relateditems.map((products) => (
            <div key={products.id}>{products.title}</div>
          ))} */}
      </Carousel>
    </div>
  );
};

export default BestSellers;
