import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

//import Home from './pages/home';
import Navbar from './components/Navbar'
import ShortenLinkPage from './pages/shorten-link-page';
import SkipPage from './pages/skip-page';
import RegisterCard from './pages/register-page';

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
        <Route path="/register" exact>
          <RegisterCard />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
