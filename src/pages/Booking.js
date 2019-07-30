import React from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import sweetalert from "sweetalert2";
import Helmet from "react-helmet";

import HeadText from "../components/HeaderPage";
import DatePicker from "../components/Datepicker";
import cookie from "react-cookies";

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
      <div>
        <Helmet bodyAttributes={{ style: "background-color: #F8F9FA" }} />
        <HeadText name="Booking" />
        <div className="container mt-2">
          <form onSubmit={this.handleBooking}>
            <div className="form-group px-3 m-0 pb-4">
              <label className="m-2">ชื่อผู้ขอเช่า</label>
              <input type="text" className="form-control" value={this.state.applicant} />
              <label className="m-2">ชื่อองค์กรผู้ขอเช่า</label>
              <input
                type="text"
                className="form-control"
                value={this.state.organization}
              />
              <label className="m-2">เหตุผลที่ขอเช่า</label>
              <textarea
                className="form-control"
                value={this.state.description}
                onChange={e => this.handleChange(e.target.value, "description")}
                required
              />
              <div>
                <label className="m-2">ป้ายที่ต้องการเช่า</label>

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
                <div className="row mt-3 col-12 m-0">
                  <div class="card mb-3">
                    <div class="row no-gutters">
                      <div class="col-12 col-sm-4">
                        <img
                          src={"img/" + this.state.sign.picture}
                          class="align-middle card-img"
                        />
                      </div>
                      <div class="col-12 col-sm-8">
                        <div class="card-body">
                          <span>ชื่อ : {this.state.sign.name}</span>
                          <br />
                          <span>สถานที่ : {this.state.sign.location}</span>
                          <br />
                          <span>
                            จองก่อน : {this.state.sign.beforebooking} วัน
                          </span>
                          <br />
                          <span>
                            จองได้มาก : {this.state.sign.limitdate} วัน
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <label className="m-2">วันที่ต้องการเช่า </label>
              <DatePicker
                date={this.setDate}
                ref={this.datepicker}
                sign={this.state.sign.id}
              />
            </div>

            <div className="mx-3 mb-5">
              <button
                type="submit"
                className="btn btn-outline-success mr-3"
              >
                ทำการจอง
              </button>
              <Link to="/">
                <button type="button" className="btn btn-outline-danger">
                  กลับ
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Booking;
