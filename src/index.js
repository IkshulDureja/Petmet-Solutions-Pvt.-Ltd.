import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {Circle2} from 'react-preloaders'

import "bootstrap/dist/css/bootstrap.min.css";

// ------------------bootswatch-------------
import "bootswatch/dist/minty/bootstrap.min.css";

import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <Router>
    <App />
    <Circle2 color={'#FF5352'} time={1000}/>
  </Router>,
  document.getElementById("root")
);


serviceWorker.unregister();
