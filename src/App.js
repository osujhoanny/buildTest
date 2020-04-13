import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
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
    <Fragment>
      <AlertState>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={SignIn}/>
          <Route exact path='/signup' component={SignUp}/>
          <PrivateRoute path='/me/:component' component={Me}/>
        </Switch>
      </Router>
      </AlertState>
    </Fragment>
  );
}

export default App;
