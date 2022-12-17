import React, { useState, useEffect } from "react";
import FoodCategory from "../pictures/image 15.png";
import Arrow from "../pictures/Vector.png";
import { db, auth } from "../../firebase";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";
import SquareCard from "../dashboardclient/SquareCard";
import "./shopproducts.css";
import { useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import ContinuousSlider from "./Slider";
import ShopProductsarray from "./ShopProductsarray";
import Dropdownfun from "./Dropdownfun";

const ShopProducts = () => {
  const [products, setProducts] = useState(null);
  const [brandFilter, setBrandFilter] = useState(null);
  const [costFilter, setCostFilter] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCost, setSelectedCost] = useState(null);
  const { subComponent } = useParams();
  useEffect(() => {
    db.collection("items")
      .doc(subComponent)
      .collection("products")
      .get()
      .then((docs) => {
        var temp = [];
        docs.forEach((doc) => {
          temp.push({ ...doc.data(), key: doc.id });
        });

        setProducts(temp);
        console.log(temp.length);
      });

    db.collection("homepage")
      .doc("filter")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCostFilter(doc.data().cost);
          setBrandFilter(doc.data().brand);
        }
      });
  }, []);

  const applyFilter = () => {
    console.log(selectedBrands);
    console.log(selectedCost);
    if (products) {
      var temp = [];
      products.forEach((pro) => {
        if (pro.filter) {
          if (
            Number(pro.filter.cost) < selectedCost &&
            selectedBrands.includes(pro.filter.brand)
          ) {
            temp.push(pro);
          }
          setProducts(temp);
        }
      });
    }
  };

  const addToBrands = (val) => {
    var temp = selectedBrands;
    temp.push(val);
    setSelectedBrands(temp);
  };

  const [dropdownvar2, setDropdownvar2] = useState(false);
  const dropdowndata2 = () => {
    if (dropdownvar2 == false) {
      setDropdownvar2(true);
    } else {
      setDropdownvar2(false);
    }
  };

  const Dropdownfun2 = () => {
    return (
      <ul className="ulofsort">
        <li style={{ marginBottom: "4px" }}>Recommended</li>
        <li style={{ marginBottom: "4px" }}>Price(low to high)</li>
        <li style={{ marginBottom: "4px" }}>Price(high to low)</li>
      </ul>
    );
  };

  const listarray = [1, 2];
  const [isFilterOpen, setFilterState] = useState(false);

  return (
    <div>
      <p className="pathontop">Home &gt; {subComponent}</p>
      {/* &gt gives > */}
      <span>
        <div className="products_bothflex">
          <div className="products_leftflex products_leftflexdisplay">
            <h5>BRAND</h5>
            <ul>
              {brandFilter
                ? brandFilter.map((brand) => (
                    <li>
                      <input
                        onClick={(e) => {
                          addToBrands(e.target.value);
                        }}
                        style={{ marginRight: "14px" }}
                        type="checkbox"
                        value={brand}
                      />
                      {brand}
                    </li>
                  ))
                : null}
            </ul>
            <h5>PRICE</h5>
            <ul>
              {costFilter
                ? costFilter.map((cost) => (
                    <li>
                      <input
                        onClick={() => {
                          setSelectedCost(cost);
                        }}
                        style={{ marginRight: "14px" }}
                        value={cost}
                        type="checkbox"
                      />
                      {cost}
                    </li>
                  ))
                : null}
            </ul>
            <button className="newapplyy" onClick={applyFilter}>
              Apply
            </button>
          </div>

          <div className="products_rightflex">
            <div className="start_rightflex">
              <p className="dogfoodtag">{subComponent}</p>
              <div className="filterbuttonflex">
                <button
                  onClick={() => setFilterState(!isFilterOpen)}
                  className="shopproducts_filterbutton ddropdown"
                >
                  FILTER
                </button>
                {isFilterOpen ? (
                  <div>
                    <div>
                      <h5>BRAND</h5>
                      <ul>
                        {brandFilter
                          ? brandFilter.map((brand) => (
                              <li>
                                <input
                                  onClick={(e) => {
                                    addToBrands(e.target.value);
                                  }}
                                  style={{ marginRight: "14px" }}
                                  type="checkbox"
                                  value={brand}
                                />
                                {brand}
                              </li>
                            ))
                          : null}
                      </ul>
                      <h5>PRICE</h5>
                      <ul>
                        {costFilter
                          ? costFilter.map((cost) => (
                              <li>
                                <input
                                  onClick={() => {
                                    setSelectedCost(cost);
                                  }}
                                  style={{ marginRight: "14px" }}
                                  value={cost}
                                  type="checkbox"
                                />
                                {cost}
                              </li>
                            ))
                          : null}
                      </ul>
                      <button className="newapplyy" onClick={applyFilter}>
                        Apply
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="start_rightflex_subcolumn">
                <button
                  className="ddropdown bigscreensort"
                  onClick={dropdowndata2}
                >
                  SORT BY: Recommended <ArrowDropDownIcon />
                </button>
                <button
                  className="ddropdown smallscreensort"
                  onClick={dropdowndata2}
                >
                  SORT BY:
                </button>

                {dropdownvar2 && <Dropdownfun2 />}
              </div>
            </div>
            <div>
              <p className="showingresults">Showing 1-12 of 130 results</p>
            </div>
            <div className="products_rightflex_cardflex">
              {products
                ? products.map((pro) => (
                    //                <Link to={"/ShopPage/" + subComponent + "/" + pro.key}>
                    <div>
                      <SquareCard
                        title={pro.details.name}
                        size={pro.details.size}
                        cost={pro.details.cost}
                        mrp={pro.details.mrp}
                        _id={pro.key}
                        info={pro.details}
                        image={pro.details.url}
                        style={{ margin: "31px" }}
                      />
                    </div>
                    //              </Link>
                    /* <Link to={"/ShopPage/" + subComponent + "/" + pro.key}>
                    <SquareCard style={{ margin: "31px" }} />
                  </Link>
                  <Link to={"/ShopPage/" + subComponent + "/" + pro.key}>
                    <SquareCard style={{ margin: "31px" }} />
                  </Link> */
                  ))
                : null}
            </div>
          </div>
        </div>
      </span>
    </div> /*{" "}
        <div className="thumb">
          <Link to={"/ShopPage/" + +"/" + pro.key}>
            <div className="personalthumb">
              <div>
                <img
                  // style={{ backgroundColor: "#f5f5f5" }}
                  className="dishpicture"
                  src={pro.details.url}
                />
              </div>
              <p className="dishnames">{pro.details.name}</p>

              <span>
                <button type="button" className="optionsbutton">
                  {pro.details.size}
                </button>
              </span>
              <span>
                <div className="priceofproduct">₹{pro.details.cost} </div>
              </span>
            </div>
          </Link>
        </div>{" "}
        */
    // ................................................................... //{" "}
    /* <div className="bodyleavingnav">
        /*{" "}
        <span>      
          <hr />
          <div
            // style={{ margin: "20px" }}
            class="btn-group"
            role="group"
            aria-label="Button group with nested dropdown"
          >
            <button type="button" class="btn btn-success">
              Filter
            </button>
            <div class="btn-group" role="group">
              <button
                id="btnGroupDrop2"
                type="button"
                class="btn btn-success dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop2">
                <a class="dropdown-item" href="#">
                  Dropdown link
                </a>
                <a class="dropdown-item" href="#">
                  Dropdown link
                </a>
              </div>
            </div>
          </div>

          <div
            class="btn-group"
            role="group"
            aria-label="Button group with nested dropdown"
          >
            <button type="button" class="btn btn-success">
              Sort
            </button>
            <div class="btn-group" role="group">
              <button
                id="btnGroupDrop2"
                type="button"
                class="btn btn-success dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop2">
                <a class="dropdown-item" href="#">
                  Dropdown link
                </a>
                <a class="dropdown-item" href="#">
                  Dropdown link
                </a>
              </div>
            </div>
          </div>
        </span>{" "}
        */ //{" "}
    // </div>

    // ................................................................................
  );
};

export default ShopProducts;
