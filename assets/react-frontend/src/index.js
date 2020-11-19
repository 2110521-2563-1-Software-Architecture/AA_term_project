<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

//import Home from './pages/home';
import Navbar from './components/Navbar'
<<<<<<< HEAD
import SkipPage from './pages/skip-page';
import RegisterPage from './pages/register-page';
import HistoryPage from './pages/historyPage';
<<<<<<< HEAD
import HomePage from './pages/Homepage.js';

const App = () => {
=======
=======
import SkipPage from './pages/skip-page'
import RegisterPage from './pages/register-page'
import HistoryPage from './pages/historyPage'
>>>>>>> initial redirect page
import StateContext from "./utils/context/stateContext"
import UserContext from "./utils/context/userContext"
import LoginContext from "./utils/context/loginContext"
import ProfilePictureContext from "./utils/context/profilePictureContext"
import HomePage from './pages/Homepage'
import UserPage from './pages/userPage'
import RedirectPage from "./pages/redirect-page"
=======
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SkipPage from "./pages/skip-page";
import RegisterPage from "./pages/register-page";
import HistoryPage from "./pages/historyPage";
import StateContext from "./utils/context/stateContext";
import UserContext from "./utils/context/userContext";
import LoginContext from "./utils/context/loginContext";
import ProfilePictureContext from "./utils/context/profilePictureContext";
import UrlContext from "./utils/context/urlContext";
import HomePage from "./pages/Homepage";
import UserPage from "./pages/userPage";
import RedirectPage from "./pages/redirect-page";
<<<<<<< HEAD
>>>>>>> add get link
=======
import PageNotFound from "./components/PageNotFound";
>>>>>>> add page not found page

const App = () => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", "");
        token = "";
      }

      if (token) {
        setState("user");
      }

      setUserToken(token);
    };

    checkLoginStatus();
  }, []);

<<<<<<< HEAD
<<<<<<< HEAD
  const [state, setState] = useState("guest")
  const [userToken, setUserToken] = useState(undefined)
  const [loginRender, setLoginRender] = useState(false)
  const [profilePicture, setProfilePicture] = useState({
    payload: "",
    reRender: false
  })
=======
  const [state, setState] = useState("guest");
  const [userToken, setUserToken] = useState(undefined);
  const [loginRender, setLoginRender] = useState(false);
>>>>>>> add get link
=======
  const [state, setState] = useState("guest");
  const [userToken, setUserToken] = useState(undefined);
  const [loginRender, setLoginRender] = useState(false);
  const [profilePicture, setProfilePicture] = useState({
    payload: "",
    reRender: false,
  });
>>>>>>> merge front

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> fix bug browser go back, still in fixing
=======
  const [url_redirect, setUrl_redirect] = useState("")
=======
  const [url_redirect, setUrl_redirect] = useState("");
>>>>>>> add page not found page

>>>>>>> finish url redirect
  return (
    <Router>
<<<<<<< HEAD
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <ShortenLinkPage />
        </Route>
        <Route path="/home" exact>
          <HomePage />
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
=======
      <StateContext.Provider value={{ state, setState }}>
        <UserContext.Provider value={{ userToken, setUserToken }}>
          <LoginContext.Provider value={{ loginRender, setLoginRender }}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> finish all logic for profile picture
            <ProfilePictureContext.Provider value={{ profilePicture, setProfilePicture }}>
<<<<<<< HEAD
              <Navbar />
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/register" exact component={RegisterPage} />
                <Route path="/user" exact component={UserPage} />
                <Route path="/redirect" exact component={RedirectPage} />
                <Route path="/history" exact component={HistoryPage} />
<<<<<<< HEAD
                <Route path="/ads" exact component={SkipPage} />
              </Switch>
            </ProfilePictureContext.Provider>
=======
=======
>>>>>>> merge front
            <Navbar />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/user" exact component={UserPage} />
              <Route path="/redirect" exact component={RedirectPage} />
              <Route path="/history" exact component={HistoryPage} />
              <Route path="/:hash" exact component={SkipPage} />
            </Switch>
<<<<<<< HEAD
>>>>>>> add get link
=======
>>>>>>> merge front
=======
                <Route path="/:hash" exact component={SkipPage} />
              </Switch>
=======
=======
            <ProfilePictureContext.Provider
              value={{ profilePicture, setProfilePicture }}
            >
>>>>>>> add page not found page
              <UrlContext.Provider value={{ url_redirect, setUrl_redirect }}>
                <Navbar />
                <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/register" exact component={RegisterPage} />
                  <Route path="/profile" exact component={UserPage} />
                  <Route path="/menu" exact component={RedirectPage} />
                  <Route path="/history" exact component={HistoryPage} />
                  <Route path="/404" component={PageNotFound} />
                  <Route path="/:hash" exact component={SkipPage} />
                </Switch>
              </UrlContext.Provider>
>>>>>>> finish url redirect
            </ProfilePictureContext.Provider>
>>>>>>> finish all logic for profile picture
          </LoginContext.Provider>
        </UserContext.Provider>
      </StateContext.Provider>
>>>>>>> fix home route
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
