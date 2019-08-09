import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Base64 } from "js-base64";
import { withRouter } from "react-router-dom";

import "../assets/auth.css";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
  Form,
  Row,
  Col,
  Button
} from "reactstrap";

const logo = "/img/kmutt-original.png";
const background = "/img/login-register.jpg";
const sidebarBackground = {
  backgroundImage: "url(" + background + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "auto 150%"
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FormLogin: "d-block",
      FormForgetPassword: "d-none",
      Username: "",
      Password: "",
      redirect: false,
      error: ""
    };
  }
  componentDidMount() {
    this.Redirect();
  }
  Redirect = async () => {
    if (cookie.load("jwt") !== undefined) {
      await this.setState({
        redirect: true
      });
    }
    if (this.state.redirect) this.props.history.push("/");
  };
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };
  handleClick = () => {
    this.setState({
      FormLogin: "d-none",
      FormForgetPassword: "d-block",
      Username: ""
    });
  };

  Login = async e => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.set("username", this.state.Username);
    bodyFormData.append("password", Base64.encode(this.state.Password));
    await axios({
      method: "post",
      url: process.env.REACT_APP_BE_PATH + "/login",
      data: bodyFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(async jwt => {
        await cookie.save("jwt", jwt.data.jwt);
        await this.setState({
          redirect: true
        });
        this.Redirect();
      })
      .catch(async () => {
        await this.setState({
          error: "Username or Password incorrect"
        });
      });
  };
  Reset = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="">
        <div
          className="auth-wrapper d-flex no-block justify-content-center align-items-center"
          style={sidebarBackground}
        >
          <div className="auth-box on-sidebar">
            <div className="logo col-12">
              <div className="col-4 mx-auto">
                <img className="img-fluid" src={logo} alt="logo" />
              </div>
            </div>
            <div>
              <Row className={" " + this.state.FormLogin}>
                <div className="col-12 text-center">
                  <h5 className="font-medium mb-3">Sign In</h5>
                </div>
                <Col xs="12">
                  <Form className="mt-3" id="loginform" onSubmit={this.Login}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={this.state.Username}
                        onChange={e =>
                          this.handleChange("Username", e.target.value)
                        }
                        type="text"
                        placeholder="Username"
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={this.state.Password}
                        onChange={e =>
                          this.handleChange("Password", e.target.value)
                        }
                        type="password"
                        placeholder="Password"
                        required
                      />
                    </InputGroup>
                    <Row className="mb-3">
                      <Col xs="12">
                        <Button
                          className="btn btn-login"
                          size="lg"
                          type="submit"
                          block
                        >
                          Log In
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
