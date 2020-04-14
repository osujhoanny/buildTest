import React, { Fragment } from 'react';
import { HashRouter, Router, Switch, Route} from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";
// Components
import Me from './Components/me/Me';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/SignUp';

import AlertState from './context/alerts/alertState';
import history from "./utils/history";

import PrivateRoute from "./Components/PrivateRoute";

function App() {

  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HashRouter basename='/'>
    <Fragment>
      <AlertState>
      <Router history={history}>
        <Switch>
          <Route exact path='/buildTest' component={SignIn}/>
          <Route exact path='/signup' component={SignUp}/>
          <PrivateRoute path='/me/:component' component={Me}/>
        </Switch>
      </Router>
      </AlertState>
    </Fragment>
    </HashRouter>
  );
}

export default App;
