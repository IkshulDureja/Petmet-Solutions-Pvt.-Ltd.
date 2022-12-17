import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./topcarousel.css";
import { Carousel } from "react-bootstrap";

const TopCarousel = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    // .........................carousel.................................

    db.collection("homepage")
      .doc("carousel")
      .get()
      .then((doc) => {
        if (doc.exists) {
          var temp = [];
          doc.data().images.forEach((img) => temp.push(img));
          setImages(temp);
        }
      })
      .catch((e) => console.log(e));
    // ............................carousel...................................
  }, []);

  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel carouseltop slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          {/* .....................tried............................ */}
          {images ? (
            <div className="carousel-item active">
              <img src={images} className="d-block w-100" alt="..." />
            </div>
          ) : null}

          {images ? (
            <div className="carousel-item">
              <img src={images} className="d-block w-100" alt="..." />
            </div>
          ) : null}

          {/* yaha pe*/}

          {images ? (
            images.map((bss) => (
              <div className="carousel-item active">
                <img src={bss} className="d-block w-100" alt="..." />
              </div>
            ))
          ) : null}

          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopCarousel;
