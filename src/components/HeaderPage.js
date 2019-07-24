import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav class="navbar">
        <h1 class="navbar-brand mb-0">{this.props.name}</h1>
      </nav>
    );
  }
}

export default Header;
