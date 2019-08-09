import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router-dom";
import jwt from "jwt-simple";

const withAuth = (WrappedComponent, checkAdmin) => {
  return class ComponentWithAuth extends Component {
    render() {
      if (cookie.load("jwt") === undefined) return <Redirect to="/login" />;
      let token = jwt.decode(cookie.load("jwt"), "bookingsign");
      if (!checkAdmin && token.Role !== "admin")
        return <WrappedComponent {...this.props} />;
      if (!checkAdmin && token.Role === "admin")
        return <Redirect to="/admin" />;
      if (token.Role !== "admin") return <Redirect to="/login" />;
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
