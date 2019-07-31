import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Bar = styled.div`
  z-index: 99;
  position: fixed;
  margin-left: ${props => props.position}vw;
  height: 100%;
  overflow-y: auto;
  background-color:#435687;
  transition: 0.8s;
`;

const Test = styled.div `
  position: relative;
  cursor: pointer;
  font-size: 1.5em;
  padding: 15px 30px;
  color : white;
  text-decoration:none;
  &:hover {
    background-color:#384872;
  }
  &:active {
    background-color:#384872;
  }
`

const Pages = [{ page: "history" , path: "/dashboard"} ,{ page:"booking" , path: "/booking"}]


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <Bar
        className={this.props.size}
        position={this.props.open === true ? 0 : -100}
      >
        <div>
          {Pages.map((page) => {
            return (
              <Link to={page.path}>
                <Test className="media active" style={this.props.active === page.page ? { backgroundColor: "black" } : {}}>
                  {page.page}
                </Test>
              </Link>
            )
          })}
        </div>
      </Bar>
    );
  }
}

export default Sidebar;
