import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navs = styled.nav`
  z-index: 100;
  position: fixed;
  background-color: #f47836;
  color: white;
  height: ${props => props.height}px;
`;
const Icon = styled.i`
  font-size: 25px;
`;
const Logo = styled.img`
  height: 40px;
`;

class Navbar extends React.Component {
  handleSidebar = async () => {
    this.props.handleSidebar("");
  };
  render() {
    return (
        <Navs className={"navbar navbar-default navbar-fixed-top "+this.props.width} height={this.props.height}>
            <Icon
              className="fa fa-bars d-sm-none d-block"
              onClick={this.handleSidebar}
            />
            <Logo src="/img/kmutt.png" />
            <Icon className="fa fa-user d-sm-none d-block" />
        </Navs>
    );
  }
}

export default Navbar;
