import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Navbar from './components/Navbar'
import SkipPage from './pages/skip-page';
import RegisterPage from './pages/register-page';
import HistoryPage from './pages/historyPage';
import StateContext from "./utils/context/stateContext"
import UserContext from "./utils/context/userContext"
import HomePage from './pages/Homepage.js';

const App = () => {

  useEffect(() => {

    const checkLoginStatus = async () => {

      let token = localStorage.getItem("token")
      if (token === null) {
        localStorage.setItem("token", "")
        token = ""
      }

      if (token) {
        setState("user")
      }

      setUserToken(token)

    }

    checkLoginStatus()
  },[])

  const [state, setState] = useState("guest")
  const [userToken, setUserToken] = useState(undefined)

  return (
    <Router>
      <StateContext.Provider value={{ state, setState }}>
        <UserContext.Provider value={{ userToken, setUserToken }}>
          <Navbar />
          {userToken ? <h1>Login</h1> : null}
          <Switch>
            <Route path="/ads" exact>
              <SkipPage />
            </Route>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/history" exact>
              <HistoryPage />
            </Route>
          </Switch>
        </UserContext.Provider>
      </StateContext.Provider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
