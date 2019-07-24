import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navs = styled.ul`
position: fixed;
margin-top: 0;
  background-color: #f47836;
  color: white;
  height: 60px;
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
      <nav class="navbar">
  <a class="navbar-brand" href="#">Navbar</a>
</nav>
      // <Navs className="nav d-flex justify-content-between">
      //   <li
      //     className="nav-item d-sm-none d-block p-3"
      //     onClick={this.handleSidebar}
      //   >
      //     <Icon className="fa fa-bars" />
      //   </li>
      //   <li className="nav-item">
      //     <a className="nav-link" href="#">
      //       <Logo src="/img/kmutt.png" />
      //     </a>
      //   </li>
      //   <li className="nav-item d-sm-none d-block p-3">
      //     <Icon className="fa fa-user" />
      //   </li>
      // </Navs>
    );
  }
}

export default Navbar;
