import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

//pages
import Home from './pages/index'
import Booking from './pages/Booking'
import History from './pages/History'
function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/Booking" component={Booking} />
      <Route path="/History" component={History} />
    </Router>
  );
}

export default AppRouter;
