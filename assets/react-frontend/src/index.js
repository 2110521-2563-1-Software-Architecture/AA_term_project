import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from './pages/home';
import RegisterCard from './components/RegisterCard';
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <div> <RegisterCard /></div>
    /*<Router>
      <Switch>
        <Route path="/">
          <register />
        </Route>
      </Switch>
    </Router>*/
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
