import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Bar = styled.nav`
  box-shadow : 0px 10px 10px -15px #111;    
`;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Bar>
        <nav class="navbar bg-white">
          <h1 class="navbar-brand mb-0">{this.props.name}</h1>
        </nav>
      </Bar>
    );
  }
}

export default Header;
