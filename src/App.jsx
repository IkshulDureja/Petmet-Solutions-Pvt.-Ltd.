import React, { useEffect, useState } from "react";
import Login from "./components/signin";
import Phone from "./components/phone";
import VetLogin from "./components/vSignin";
import Checkout from "./components/checkout/Checkout";
import Dashboard from "./components/client/Dashboard";
import { auth, db } from "./firebase";
import VVerifyEmail from "./components/vVerifyEmail";
import VWaiting from "./components/vWaiting";
import VCompleteProfile from "./components/vCompleteProfile";
import VDashboard from "./components/vet/dashboard";
import SideBar from "./components/Admin/sideBar";
import { Route, Switch } from "react-router-dom";
import Addpet from "./components/client/Addpet";
import ShopProducts from "./components/client/ShopProducts";

/* --------- trial ------*/
import Profile from "./components/checkout/Profile";
import VerifyEmail from "./components/verifyEmail";
import NewProductDetails from "./components/client/NewProductDetails";
import ShopPage from "./components/shop/ShopPage";
import Cart2 from "./components/client/Cart2";

/* --------- trial ------*/
function App() {
  useEffect(() => {
    console.log("app.js");
  }, []);
  return (
    <div className="kuchh_aur" style={{ marginTop: "-100px" }}>
      <Switch>
        <Route exact path="/" component={Dashboard} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/phone" component={Phone} />
        <Route exact path="/vVerifyEmail" component={VVerifyEmail} />
        <Route exact path="/vLogin" component={VetLogin} />
        <Route exact path="/vWaiting" component={VWaiting} />
        <Route exact path="/Checkout" component={Checkout} />
        <Route exact path="/Addpet" component={Addpet} />
        <Route exact path="/verifyEmail" component={VerifyEmail} />
        <Route exact path="/vCompleteProfile" component={VCompleteProfile} />
        <Route exact path="/admin/:component" component={SideBar} />
        <Route exact path="/v/:vd" component={VDashboard} />
        <Route exact path="/productdetails" component={ShopPage} />
        <Route
          exact
          path="/:componentt/:subComponent/:productId"
          component={Dashboard}
        />
        <Route exact path="/:componentt/:subComponent" component={Dashboard} />
        <Route exact path="/:componentt" component={Dashboard} />
      </Switch>
    </div>
  );
}
export default App;
