import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import "./assets/font.css";

import FullHeader from "./components/FullHeader";
//Pages
import Login from "./pages/Login";

import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Error from "./pages/Error";
import Addsign from './pages/AddSign'
import Summary from './pages/SummaryM'
import DetailBooking from './pages/DetailBooking'

const Font = styled.div`
  font-family: 'Sukhumvit';
  font-size: 0.9em;
`;

const Pages = [
  { path: "/login", component: Login, fullheader: false },
  { path: "/dashboard", component: Dashboard, fullheader: true },
  { path: "/booking", component: Booking, fullheader: true },
  { path: "/admin", component: Admin, fullheader: true },
  { path: "/admin/summary", component: Summary, fullheader: true },
  { path: "/addsign", component: Addsign, fullheader: true },
  { path: "/booking/:id", component: DetailBooking, fullheader: true },
  { path: "/error/:status", component: Error, fullheader: true }
  
];
function CheckFullHeaderPages(props, Component, fullheader) {
  if (fullheader) return <FullHeader id={props.match.params.id} Page={Component} />;
  return <Component />;
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
                component={(props) =>
                  CheckFullHeaderPages(props,page.component, page.fullheader)
                }
              />
            );
          })}
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route render={() => <Redirect to="/error/404" />} />
        </Switch>
      </Font>
    </BrowserRouter>
  );
}

export default AppRouter;
