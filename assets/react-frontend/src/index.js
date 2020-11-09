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
import RegisterPage from './pages/register-page';
import HistoryPage from './pages/historyPage';
import HomePage from './pages/Homepage.js';

const App = () => {
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
>>>>>>> fix home route
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
