import React from 'react';
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";

//pages
import Home from './pages/index'
import Booking from './pages/Booking'
import History from './pages/History'
import Error from './pages/Error'
import Signs from './pages/Signs'

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signs} />
        <Route exact path="/Booking" component={Booking} />
        <Route exact path="/History" component={History} />
        <Route exact path="/error/:status" component={Error} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
