import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

//import Home from './pages/home';
import Navbar from './components/Navbar'
import SkipPage from './pages/skip-page';
import RegisterPage from './pages/register-page';
import HistoryPage from './pages/historyPage';
<<<<<<< HEAD
import HomePage from './pages/Homepage.js';

const App = () => {
=======
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

>>>>>>> fix bug browser go back, still in fixing
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
          <Navbar />
          <Switch>
            <Route path="/ads" exact component={SkipPage} />
            <Route path="/" exact component={HomePage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/history" exact component={HistoryPage} />
          </Switch>
        </UserContext.Provider>
      </StateContext.Provider>
>>>>>>> fix home route
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
