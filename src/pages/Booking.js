import React from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import sweetalert from "sweetalert2";
import Helmet from "react-helmet";
import DatePicker from "../components/Datepicker";
import cookie from "react-cookies";
import '../assets/booking.css'

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
} from 'reactstrap';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.datepicker = React.createRef();
    this.state = {
      applicant_id: "",
      applicant: "",
      organization: "",
      firstdate: null,
      lastdate: null,
      description: "",
      signs: [],
      sign: {}
    };
  }

  componentDidMount() {
    if (cookie.load("user") === undefined) {
      this.props.history.push("/login");
    } else {
      let user = cookie.load("user");
      this.setState({
        applicant_id: user.id,
        applicant: user.fname + " " + user.lname,
        organization: user.organization
      });
      this.fetchSigns();
    }
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
    bodyFormData.set("applicant_id", this.state.applicant_id);
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
          title: `คุณ Panupong ยืนยันจะจองป้ายตามนี้ใช่ไหม?`,
          text: `ป้าย ${this.state.sign.name} วันที่ ${moment(
            this.state.firstdate
          ).format("YYYY-MM-DD")} ถึง ${moment(this.state.lastdate).format(
            "YYYY-MM-DD"
          )}`,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่ใช่"
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
      .then(status => {
        sweetalert
          .fire({
            type: "success",
            title: "ทำการจองสำเร็จแล้ว",
            showConfirmButton: false,
            timer: 5000
          })
          .then(status => {
            window.location.href = "/";
          });
      })
      .catch(err => {
        console.log(err);
        sweetalert.fire({
          type: "error",
          title: `${err.response.data.message}`
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
          <CardBody>
            <form onSubmit={this.handleBooking}>
              <div className="mx-auto col-12 col-lg-10">
                <div className="form-group row">
                  <label className="col-3">Name  </label>
                  <div className="col-9">
                    {this.state.applicant}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-3">Organization Name  </label>
                  <div className="col-9">
                  {this.state.organization}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-3">Sign  </label>
                  <div className="col-9">
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
                    <div class="card mb-3">
                        <div class="row no-gutters">
                          <div class="col-12">
                            <img
                              src={"img/" + this.state.sign.picture}
                              class="align-middle card-img"
                            />
                          </div>
                          <div class="col-12">
                            <div class="card-body">
                              <span>Name : {this.state.sign.name}</span>
                              <br />
                              <span>Place : {this.state.sign.location}</span>
                              <br />
                              <span>
                                Date Before Booking : {this.state.sign.beforebooking} days
                              </span>
                              <br />
                              <span>
                                Limit for Booking Date : {this.state.sign.limitdate} days
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-3">Booking Date </label>
                  <div className="col-9">
                  <DatePicker
                    date={this.setDate}
                    ref={this.datepicker}
                    sign={this.state.sign.id}
                  />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-3">Reason </label>
                  <div className="col-9">
                  <textarea
                    className="form-control"
                    value={this.state.description}
                    onChange={e => this.handleChange(e.target.value, "description")}
                    required
                  />
                  </div>
                </div>
                <div className="row ml-auto">
                  <button
                    type="submit"
                    className="btn btn-outline-success mr-3"
                  >
                    Submit
                  </button>
                  <Link to="/">
                    <button type="button" className="btn btn-outline-danger">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
              
              

            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Booking;
