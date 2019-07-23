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
        <span class="navbar-brand mb-0 h1">{this.props.name}</span>
      </nav>
    );
  }
}

export default Header;
