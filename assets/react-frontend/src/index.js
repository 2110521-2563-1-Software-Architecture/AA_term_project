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
<<<<<<< HEAD
    <Navbar/>
    <ShortenLinkPage/>
    {/* <RegisterPage/>
    <SkipPage/> */}
    <Switch>
      <Route>

      </Route>
    </Switch>
=======
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
>>>>>>> 06249e471a945b05a4eb83703cf8f4d88ab4faeb
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
