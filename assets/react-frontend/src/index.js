import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Navbar from './pages/nav-bar';
import RegisterPage from './pages/RegisterPage';
import ShortenForm from './components/shorten-form';
import ShortenLinkPage from './pages/shorten-link-page';
import RegisterCard from './components/RegisterCard';
import SkipPage from './pages/skip-page';
const App = () => {
  return (
    <Router>
    <Navbar/>
    <ShortenLinkPage/>
    {/* <RegisterPage/>
    <SkipPage/> */}
    <Switch>
      <Route>

      </Route>
    </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
