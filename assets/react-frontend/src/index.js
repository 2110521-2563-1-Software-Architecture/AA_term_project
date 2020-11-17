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
import HomePage from "./pages/Homepage";
import UserPage from "./pages/userPage";
import RedirectPage from "./pages/redirect-page";

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
  const [state, setState] = useState("guest");
  const [userToken, setUserToken] = useState(undefined);
  const [loginRender, setLoginRender] = useState(false);
=======
  const [state, setState] = useState("guest")
  const [userToken, setUserToken] = useState(undefined)
  const [loginRender, setLoginRender] = useState(false)
  const [profilePicture, setProfilePicture] = useState({
    payload: "",
    reRender: false
  })
>>>>>>> d84019b411b6e302409c0f15f121415057734bda

  return (
    <Router>
      <StateContext.Provider value={{ state, setState }}>
        <UserContext.Provider value={{ userToken, setUserToken }}>
          <LoginContext.Provider value={{ loginRender, setLoginRender }}>
<<<<<<< HEAD
            <Navbar />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/user" exact component={UserPage} />
              <Route path="/redirect" exact component={RedirectPage} />
              <Route path="/history" exact component={HistoryPage} />
              <Route path="/:hash" exact component={SkipPage} />
            </Switch>
=======
            <ProfilePictureContext.Provider value={{ profilePicture, setProfilePicture }}>
              <Navbar />
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/register" exact component={RegisterPage} />
                <Route path="/user" exact component={UserPage} />
                <Route path="/redirect" exact component={RedirectPage} />
                <Route path="/history" exact component={HistoryPage} />
                <Route path="/ads" exact component={SkipPage} />
              </Switch>
            </ProfilePictureContext.Provider>
>>>>>>> d84019b411b6e302409c0f15f121415057734bda
          </LoginContext.Provider>
        </UserContext.Provider>
      </StateContext.Provider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
