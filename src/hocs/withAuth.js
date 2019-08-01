import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router-dom";
import jwt from "jwt-simple";

const withAuth = (WrappedComponent, checkAdmin) => {
  return class ComponentWithAuth extends Component {
    render() {
      if (cookie.load("jwt") === undefined) return <Redirect to="/login" />;
      if (!checkAdmin) return <WrappedComponent {...this.props} />;
      let token = jwt.decode(cookie.load("jwt"), "bookingsign");
      if (token.Role !== "admin") return <Redirect to="/login" />;
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
