import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Bar = styled.div`
  z-index: 99;
  position: fixed;
  margin-left: ${props => props.position}vw;
  height: 100%;
  overflow-y: auto;
  background-color: #3a5e74;
  transition: 1s;
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Bar
        className={this.props.size}
        position={this.props.open === true ? 0 : -100}
      >
        <ul className="text-dark p-5">
          <li className="">
            <a> Start Bootstrap </a>
          </li>
          <li className="">
            <Link to="/history">History</Link>
          </li>
        </ul>
      </Bar>
    );
  }
}

export default Sidebar;
