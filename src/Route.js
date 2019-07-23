import React from 'react';
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";

//pages
import Booking from './pages/Booking'
import History from './pages/History'
import Error from './pages/Error'
import Signs from './pages/Signs'
import Addsign from './pages/AddSign'
import TestDate from './pages/testDate'
import Test from './pages/test'
import Header from './components/Header/Header'

function AppRouter() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Signs} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/Booking" component={Booking} />
        <Route exact path="/History" comp onent={History} />
        <Route exact path="/Addsign" component={Addsign} />
        <Route exact path="/TestDate" component={TestDate} />
        <Route exact path="/error/:status" component={Error} /> */}
        <Route exact path="/" component={() => <Header component={Error}/>} />
        <Route exact path="/booking" component={() => <Header component={Booking}/>} />
        <Route exact path="/history" component={() => <Header component={History}/>} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
