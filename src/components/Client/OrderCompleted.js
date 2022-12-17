import React from 'react';
import './VetProfile.css';
import FeaturedCarousel from './featuredCarousel';

const OrderCompleted = () => {
    return ( 
        <div style={{marginTop:"0px"}}>
            <div className="container mt-4">
                <h3 style={{color:"#36a9cc", fontWeight:"bold",textAlign:"left"}}>ORDER PLACED!</h3>
                <div className="row mt-4 mb-4">
                    <h5 className="col-8" style={{color:"#03a300"}}>For more details about the order, check your registered E-Mail ID</h5>
                    <div className="col" style={{textAlign:"right"}}>
                        <span className="badges_new help">Need Help ?</span>
                    </div>
                </div>
                <hr className="mt-4" style={{width:"100%"}}/>
            </div>
            <FeaturedCarousel/>
        </div>
     );
}
 
export default OrderCompleted;