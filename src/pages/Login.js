import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import Headtext from "../components/HeaderPage";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Login: null
    };
  }

  handleChange = (event, state) => {
    this.setState({ [state]: event });
  };

  Login = async () => {
    var bodyFormData = new FormData();
    bodyFormData.set("username", this.state.Username);
    bodyFormData.append("password", this.state.Password);
    console.log(this.state.Username);
    console.log(this.state.Password);
    await axios({
      method: "post",
      url: process.env.REACT_APP_BE_PATH + "/login",
      data: bodyFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(user => {
      // console.log(user.data);
      cookie.save("user", user.data);
      this.setState({
        Login: true
      });
      // console.log(cookie.load("user"));
    });
  };

  Logut = () => {
    cookie.remove("user");
    this.setState({
      Login: false
    });
  };

  render() {
    if (cookie.load("user") !== undefined) {
      return (
        <div>
          <Headtext name="Logout" />
          <div>
            <button
              type="button"
              className="btn btn-outline-danger m-3"
              onClick={this.Logut}
              >
              Logout
            </button>
          </div>
        </div>
      );
    }
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
              onClick={this.Login}
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
    );
  }
}

export default Login;
