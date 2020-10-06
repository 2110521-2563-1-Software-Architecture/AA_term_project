import React from 'react';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.js";
import SignUp from "./components/signup.js";
import Home from "./pages/home.js"
import Navbar from "./pages/nav-bar"
function App() {
  return (<Router>
         <Navbar/>
          <Switch>
            <Route path='/' component={Home} />
          </Switch>
    </Router>
  );
}

export default App;
