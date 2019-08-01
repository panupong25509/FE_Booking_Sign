import React from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import sweetalert from "sweetalert2";
import DatePicker from "../components/Datepicker";
import cookie from "react-cookies";
import "../assets/booking.css";
import WithAuth from "../hocs/withAuth";

import { Col, Card, CardBody, CardTitle } from "reactstrap";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.datepicker = React.createRef();
    this.state = {
      applicant: {},
      firstdate: null,
      lastdate: null,
      description: "",
      signs: [],
      sign: {}
    };
  }

  componentDidMount() {
    this.props.page("Booking");
    this.fetchUser();
    this.fetchSigns();
  }

  handleChange = async (event, state) => {
    await this.setState({ [state]: event });
  };

  handelSetSign = async event => {
    await this.setState({
      sign: JSON.parse(event)
    });
    this.datepicker.current.handleFetchSignId(this.state.sign.id);
  };
  fetchUser = async () => {
    let header = {
      headers: {
        Authorization: "Bearer ".concat(cookie.load("jwt"))
      }
    };
    await axios
      .get(process.env.REACT_APP_BE_PATH + "/user", header)
      .then(user => {
        console.log(user.data);
        // if(user.data.)
        this.setState({
          applicant: user.data
        });
      });
  };
  fetchSigns = async () => {
    await axios
      .get(process.env.REACT_APP_BE_PATH + "/allsign")
      .then(signs => {
        if (signs.data.signs != null) {
          this.setState({
            signs: signs.data.signs,
            sign: signs.data.signs[0]
          });
        }
        this.datepicker.current.handleFetchSignId(this.state.sign.id);
      })
      .catch(err => {
        if (err.response.state !== null) {
          window.location.href = `/error/${err.response.status}`;
        }
        window.location.href = "/error";
      });
  };
  handleBooking = e => {
    var bodyFormData = new FormData();
    bodyFormData.set("applicant_id", this.state.applicant.id);
    bodyFormData.append("sign_id", this.state.sign.id);
    bodyFormData.append("description", this.state.description);
    bodyFormData.append(
      "first_date",
      moment(this.state.firstdate).format("YYYY-MM-DD")
    );
    bodyFormData.append(
      "last_date",
      moment(this.state.lastdate).format("YYYY-MM-DD")
    );
    if (this.checkForm()) {
      sweetalert
        .fire({
          title: "Do you confirm to book this?",
          text: `Sign ${this.state.sign.name} Date ${moment(
            this.state.firstdate
          ).format("DD/MM/YY")} - ${moment(this.state.lastdate).format(
            "DD/MM/YY"
          )}`,
          showCancelButton: true,
          confirmButtonColor: "#28A745",
          cancelButtonColor: "#DC3545",
          confirmButtonText: "Yes",
          cancelButtonText: "No"
        })
        .then(result => {
          if (result.value) {
            this.postBooking(bodyFormData);
          }
        });
    } else {
      sweetalert.fire({
        type: "error",
        title: "กรอกข้อมูลไม่ครบ"
      });
    }
    e.preventDefault();
  };
  postBooking = bodyFormData => {
    axios({
      method: "post",
      url: "http://127.0.0.1:3000/addbooking",
      data: bodyFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(() => {
        sweetalert
          .fire({
            type: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1000
          })
          .then(() => {
            window.location.href = "/";
          });
      })
      .catch(err => {
        console.log(err);
        sweetalert.fire({
          type: "error",
          title: `${err.response.data.message}`,
          confirmButtonColor: "#28A745"
        });
      });
  };

  setDate = async date => {
    await this.setState({
      firstdate: date.firstdate,
      lastdate: date.lastdate
    });
  };

  checkForm() {
    if (
      this.state.firstdate === null ||
      this.state.lastdate === null ||
      this.state.description === ""
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Col className="page-content container-fluid" lg="12">
        <Card className="container p-0">
          <CardBody className="shadow">
            <CardTitle>Booking</CardTitle>
            <form onSubmit={this.handleBooking}>
              <div className="mx-auto col-12 col-lg-10">
                <div className="form-group row">
                  <label className="col-3 p-0 d-none d-sm-block">Name</label>
                  <div className="col-9 p-0">
                    {this.state.applicant.fname} {this.state.applicant.lname}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-3 p-0 d-none d-sm-block">
                    Organization
                  </label>
                  <div className="col-9 p-0">
                    {this.state.applicant.organization}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-12 col-md-3 p-0">Sign </label>
                  <div className="col-12 col-md-9 p-0">
                    <select
                      className="form-control"
                      onChange={e => this.handelSetSign(e.target.value)}
                    >
                      {this.state.signs.map(value => {
                        return (
                          <option value={JSON.stringify(value)}>
                            {value.name} {value.location}
                          </option>
                        );
                      })}
                    </select>
                    <div class="card mb-3 mt-3">
                      <div class="row no-gutters">
                        <div class="col-12">
                          <img
                            alt="Sign"
                            src={"img/" + this.state.sign.picture}
                            class="align-middle card-img"
                          />
                        </div>
                        <div class="col-12">
                          <div class="card-body">
                            <span>
                              Name<span> : </span>
                              {this.state.sign.name}
                            </span>
                            <br />
                            <span>
                              Place<span> : </span>
                              {this.state.sign.location}
                            </span>
                            <br />
                            <span>
                              Date Before Booking<span> : </span>
                              {this.state.sign.beforebooking} days
                            </span>
                            <br />
                            <span>
                              Limit for Booking Date<span> : </span>
                              {this.state.sign.limitdate} days
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-12 col-md-3 p-0">Booking Date </label>
                  <div className="col-12 col-md-9 p-0">
                    <DatePicker
                      date={this.setDate}
                      ref={this.datepicker}
                      sign={this.state.sign.id}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-12 col-md-3 p-0">Reason </label>
                  <div className="col-12 col-md-9 p-0">
                    <textarea
                      className="form-control"
                      value={this.state.description}
                      onChange={e =>
                        this.handleChange(e.target.value, "description")
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 p-0 d-flex justify-content-between">
                    <Link to="/">
                      <button type="button" className="btn btn-outline-danger">
                        Back
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-outline-success"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default WithAuth(Booking);
