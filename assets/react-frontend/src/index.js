import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/home';
import Navbar from './components/Navbar'
import ShortenLinkPage from './pages/shorten-link-page';
import SkipPage from './pages/skip-page';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <ShortenLinkPage />
        </Route>
        <Route path="/ads" exact>
          <SkipPage />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
