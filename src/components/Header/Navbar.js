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
      <Navs
        className={"navbar navbar-default navbar-fixed-top " + this.props.width}
        height={this.props.height}
      >
        <Link className=" d-sm-none d-block text-white ">
          <Icon className="fa fa-bars" onClick={this.handleSidebar} />
        </Link>
        <Link to="/">
          <Logo src="/img/kmutt.png" />
        </Link>
        <Link to="/login">
          <Icon className="fa fa-user text-white mr-2" />
        </Link>
      </Navs>
    );
  }
}

export default Navbar;
