import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";

const Navs = styled.ul`
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
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         toggled : true
    //     }
    // }
    handleSidebar = async () => {
        let toggled = ""
        // if(this.state.toggled !== true){
        //     toggled = true
        // }
        // await this.setState({
        //     toggled: toggled
        // })
        this.props.handleSidebar(toggled)

    }
  render() {
    return (
      <div>
        <Navs className="nav d-flex justify-content-between">
          <li
            className="nav-item d-sm-none d-block p-3"
            onClick={this.handleSidebar}
          >
            <Icon className="fa fa-bars" />
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <Logo src="/img/kmutt.png" />
            </a>
          </li>
          <li className="nav-item d-sm-none d-block p-3">
            <Icon className="fa fa-user" />
          </li>
        </Navs>
        {/* <Sidebar sidebar={this.state.toggled}/> */}
      </div>
    );
  }
}

export default Navbar;
