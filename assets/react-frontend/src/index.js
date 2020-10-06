import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from './pages/home';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <div><RegisterPage /></div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
