import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import FullHeader from "./components/FullHeader";

//Pages
import Login from "./pages/Login";

import Booking from "./pages/Booking";
import History from "./pages/History";
import Error from "./pages/Error";
import './assets/font.css'
import styled  from 'styled-components';

const Font = styled.div`
  font-family: 'Sukhumvit';
`;

const Pages = [
  { path: "/login", component: Login, fullheader: false },
  { path: "/dashboard", component: History, fullheader: true },
  { path: "/booking", component: Booking, fullheader: true },
  { path: "/error/:status", component: Error, fullheader: true },
];
function CheckFullHeaderPages(Component, fullheader) {
  if(fullheader) return <FullHeader Page={Component}/>
  return <Component />
}
function AppRouter() {
  return (
    <BrowserRouter>
      <Font>
        <Switch>
          {Pages.map(page => {
            return (
              <Route
                exact
                path={page.path}
                component={() => CheckFullHeaderPages(page.component, page.fullheader)}
              />
            );
          })}
          <Route exact path="/" render={() => <Redirect to='/dashboard'/>} />
          <Route render={() => <Redirect to='/error/404'/>} />
        </Switch>
      </Font>
      </BrowserRouter>
  );
}

export default AppRouter;
