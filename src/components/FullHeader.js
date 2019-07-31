import React from "react";

import Navbar from "./Header/Navbar";
import Sidebar from "./Header/Sidebar";
import { CheckAuth } from "../Authentication";

class FullHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StatusSidebar: true, //open sidebar ex.
      SidebarWidth: "col-5 col-md-2 col-sm-3 p-0", //width of sidbar ex.
      PageWidth: "col-12 col-md-10 col-sm-9", //width of Page ex.
      NavWidth: "col-12", //width of navbar ex.
      NavHeight: 60, //height of navbar ex.
      Page: ""
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    let statusSidebar = false;
    if (window.innerWidth > 575) {
      statusSidebar = true;
    }
    this.setState({
      StatusSidebar: statusSidebar
    });
  };

  handleSidebar = async () => {
    let statusSidebar = false;
    if (this.state.StatusSidebar === false) {
      statusSidebar = true;
    }
    await this.setState({
      StatusSidebar: statusSidebar
    });
  };

  SetPage = async page => {
    this.setState({
      page: page
    });
  };

  render() {
    const Page = this.props.Page;
    return (
      <div>
        <Navbar
          handleSidebar={this.handleSidebar}
          width={this.state.NavWidth}
          height={this.state.NavHeight}
        />
        <div className="col-12" style={{ paddingTop: this.state.NavHeight }}>
          <div className="row">
            <div className={this.state.SidebarWidth + " p-0"}>
              <Sidebar
                open={this.state.StatusSidebar}
                size={this.state.SidebarWidth}
                active={this.state.page}
              />
            </div>
            <div className={this.state.PageWidth + " p-0"}>
              <Page page={this.SetPage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FullHeader;
