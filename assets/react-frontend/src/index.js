import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/home';
import Register  from './pages/register';
import Navbar from './pages/nav-bar';


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" component = {Home}/>
        <Route path="/register" component = {Register} />

      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
