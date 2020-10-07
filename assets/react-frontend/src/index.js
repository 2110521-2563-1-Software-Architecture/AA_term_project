import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Navbar from './pages/nav-bar';
import RegisterCard from './components/RegisterCard';
import RegisterPage from './pages/RegisterPage';
const App = () => {
  return (
    <Router>
    <Navbar/>
    <div><RegisterPage/></div>
    <Switch>
      <Route>

      </Route>
    </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
