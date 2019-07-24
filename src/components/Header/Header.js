import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: "toggled",
      dimensions: null
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    if (window.innerWidth > 724) {
      this.setState({
        toggled: "toggled"
      });
    }
  };

  handleSidebar = async () => {
    let toggled = "";
    if (this.state.toggled !== "toggled") {
      toggled = "toggled";
    }
    await this.setState({
      toggled: toggled
    });
  };

  render() {
    return (
      <div>
        <Navbar handleSidebar={this.handleSidebar} />
        <Sidebar
          ShowSidebar={this.state.toggled}
          component={this.props.component}
        />
      </div>
    );
  }
}

export default Header;
