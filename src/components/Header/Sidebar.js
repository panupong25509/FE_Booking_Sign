import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../assets/sidebar.css";
const Wrapper = styled.div`
  padding-left: 250px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
`;
// const Side = styled.div`
//   z-index: 1000;
//   position: fixed;
//   left: 250px;
//   width: 0;
//   height: 100%;
//   margin-left: -250px;
//   overflow-y: auto;
//   background-color: #000;
//   -webkit-transition: all 0.5s ease;
//   -moz-transition: all 0.5s ease;
//   -o-transition: all 0.5s ease;
//   transition: all 0.5s ease;
// `;
// const SidebarUl = styled.ul`
//   position: absolute;
//   top: 0;
//   width: 250px;
//   margin: 0;
//   padding: 0;
//   list-style: none;
// `;
// const SidebarLi = styled.ul`
//   text-indent: 20px;
//   line-height: 40px;
// `;
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const Component = this.props.component;
    return (
      <div id="wrapper" className={this.props.ShowSidebar}>
        <div id="sidebar-wrapper" className="shadow">
          <ul className="sidebar-nav text-dark">
            <li className="sidebar-brand">
              <a> Start Bootstrap </a>
            </li>
            <li className="sidebar-brand">
              <Link to="/history">History</Link>
            </li>
          </ul>
        </div>
        <Component />
      </div>
    );
  }
}

export default Sidebar;
