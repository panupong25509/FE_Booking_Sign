import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import sweetalert from "sweetalert2";
import Headtext from "../components/HeaderPage";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      FName: "",
      LName: "",
      Organization: ""
    };
  }

  handleChange = (event, state) => {
    this.setState({ [state]: event });
  };

  Register = () => {
    var bodyFormData = new FormData();
    bodyFormData.set("username", this.state.Username);
    bodyFormData.append("password", this.state.Password);
    bodyFormData.append("fname", this.state.FName);
    bodyFormData.append("lname", this.state.LName);
    bodyFormData.append("organization", this.state.Organization);
    axios({
      method: "post",
      url: process.env.REACT_APP_BE_PATH + "/register",
      data: bodyFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(() => {
        sweetalert.fire({
          type: "success",
          title: "สมัครสมาชิกเสร็จแล้ว",
          showConfirmButton: false,
          timer: 5000
        });
      })
      .catch(err => {
        if (err.response.data !== null) {
          sweetalert.fire({
            type: "error",
            title: `${err.response.data.message}`
          });
        }
      });
  };

  render() {
    return (
      <div>
        <Headtext name="Register" />
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
            <div className="row col-12 p-0 mx-0">
              <div className="col-12 col-sm-6 px-0 pr-sm-2">
                <label className="m-2">Firstname</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.FName}
                  onChange={e => this.handleChange(e.target.value, "FName")}
                />
              </div>
              <div className="col-12 col-sm-6 px-0 pl-sm-2">
                <label className="m-2">Lastname</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.LName}
                  onChange={e => this.handleChange(e.target.value, "LName")}
                />
              </div>
            </div>
            <label className="m-2">Organization</label>
            <input
              type="text"
              className="form-control"
              value={this.state.Organization}
              onChange={e => this.handleChange(e.target.value, "Organization")}
            />
          </div>
          <div className="mt-4 mb-5">
            <button
              type="button"
              className="btn btn-outline-success mr-3"
              onClick={this.Register}
            >
              ลงทะเบียน
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

export default Register;
