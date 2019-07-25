import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Headtext from '../components/HeaderPage'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
    };
  }

  handleChange = (event, state) => {
    this.setState(
      { [state]: event }
    );
  };

  render() {
    return (
      <div>
        <Headtext name="Login" />
        <div className="container mt-2">
          <Helmet bodyAttributes={{ style: "background-color: #F8F9FA" }} />
          <div>
            <label className="m-2">Username</label>
            <input
              type="text"
              className="form-control"
              value={this.state.Username}
              onChange={e => this.handleChange(e.target.value, "Username")}
            />
            <label className="m-2">Password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.Password}
              onChange={e => this.handleChange(e.target.value, "Password")}
            />
          </div>
          <div className="mt-4 mb-5">
            <button
                type="button"
                className="btn btn-outline-success mr-3"
                // onClick={}
            >
                ลงชื่อเข้าใช้
            </button>
            <Link to="/">
                <button type="button" className="btn btn-outline-danger">
                กลับ
                </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login