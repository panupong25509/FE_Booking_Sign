import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import FullHeader from "./pages/FullHeader";

//Pages
import Login from "./pages/Login";

import Booking from "./pages/Booking";
import History from "./pages/History";
import Error from "./pages/Error";

const Font = styled.div`
  font-family: "Kanit", sans-serif;
`;

const Pages = () => {
  return (
    <Switch>
      <Route exact path="/" component={History} />
      <Route exact path="/booking" component={Booking} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/error/:status" component={Error} />
      <Route component={Error} />
    </Switch>
  );
};
function AppRouter() {
  return (
    <BrowserRouter>
      <Font>
        <FullHeader LoginPage={Login} Route={Pages} />
      </Font>
    </BrowserRouter>
  );
}

export default AppRouter;
