import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Navbar from './components/Navbar'
import ShortenLinkPage from './pages/shorten-link-page';
import SkipPage from './pages/skip-page';
import RegisterPage from './pages/register-page';
import HistoryPage from './pages/historyPage';
import StateContext from "./utils/context/stateContext"

const App = () => {

  const [state, setState] = useState("guest")

  return (
    <Router>
      <StateContext.Provider value={{ state, setState }}>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <ShortenLinkPage />
          </Route>
          <Route path="/ads" exact>
            <SkipPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/history" exact>
            <HistoryPage />
          </Route>
        </Switch>
      </StateContext.Provider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
