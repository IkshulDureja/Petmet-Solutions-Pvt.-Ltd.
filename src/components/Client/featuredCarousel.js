import React,{useState, useEffect} from 'react';
import SquareCard from './SquareCard';
import Carousel from "react-elastic-carousel";
import { db } from "../../firebase";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 240, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 },
  ];
  
const FeaturedCarousel = () => {

    const [cats, setCats] = useState(null);
    useEffect(()=>{
        db.collection("items")
        .doc("Cat Essentials")
        .collection("products")
        .get()
        .then((docs) => {
          var temp = [];
          docs.forEach((doc) => temp.push({...doc.data(), key:doc.id }));
          setCats(temp);
          console.log(cats)
          console.log(temp)
        })
        .catch((e) => console.log(e));
    },[]);

    return ( 
        <div>
            <h2 className="mt-4" style={{ paddingBottom: "20px",fontWeight:"bold" }}>
                TOP FEATURED
            </h2>
            <div
                className="carousel-styling"
                style={{ justifyContent: "center", paddingBottom: "40px" }}
            >
                <Carousel breakPoints={breakPoints}>

                
                {cats ? (
                  cats.map((ca) => <item>       
                  <SquareCard _id={ca.key} info={ca.details} title={ca.details.name} image={ca.details.url} size={ca.details.size} cost={ca.details.cost} mrp={ca.details.mrp}/>
                  </item>
                  )
                 ) : (
                   <h5>Cat Essentials arriving</h5>
                 )
                 }

               </Carousel>
            </div>
        </div>
     );
}
 
export default FeaturedCarousel;