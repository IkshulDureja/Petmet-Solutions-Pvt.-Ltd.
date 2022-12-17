import React from "react";
import ReactDOM from 'react-dom';
import "./App.scss";
import { Login, Register } from "./components/login/index";
import Navbar from './navbar'
import { register } from "./serviceWorker";
import Checkout from "./components/checkout/Checkout";
import App from './App'
import Select from './components/checkout/select'
class Checkin extends React.Component{
    constructor(){
        super();
        this.state = {
            screen: App //App,Select
        }
    }

    navigate(){
        this.setState({
            screen:'Select'
        })
    }

render(){
    return(
    <div>
        {
    this.state.screen === 'App' && (
                 <div>
                <App onNavigate = {this.navigate}/>
             </div>
     ) 
     }
     {
         this.state.screen === 'Select' && (
             <div>
                 <Select/>
                 </div>
         )
     }
   </div>
    )
}

}



export default Checkin