import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Bar = styled.div`
  z-index: 99;
  position: fixed;
  margin-left: ${props => props.position}vw;
  height: 100%;
  overflow-y: auto;
  font-weight: 1000;
  background-image: linear-gradient(#435687, #435687);
`;

const Test = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 1em;
  padding: 15px 30px;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: #384872;
  }
  &:active {
    background-color: #384872;
  }
`;

const Pages = [
  { page: "Dashboard", path: "/dashboard" },
  { page: "Booking", path: "/booking" }
];

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <Bar
        className={"shadow " + this.props.size}
        position={this.props.open === true ? 0 : -100}
      >
        <div>
          {Pages.map(page => {
            return (
              <Link to={page.path}>
                <Test
                  className="media active"
                  style={
                    this.props.active === page.page
                      ? {
                          backgroundColor: "#4c629b",
                          borderLeft: "7px solid #ffb22d"
                        }
                      : {}
                  }
                >
                  {page.page}
                </Test>
              </Link>
            );
          })}
        </div>
      </Bar>
    );
  }
}

export default Sidebar;
