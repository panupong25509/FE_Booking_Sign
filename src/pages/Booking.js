import React from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Link } from "react-router-dom";
import sweetalert from "sweetalert2";
import Pickdate from "../components/Datepicker";
import HeadText from "../components/HeaderPage";
import Helmet from "react-helmet";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicant: "",
      organization: "",
      firstdate: new Date(),
      lastdate: new Date(),
      signs: [],
      sign: {},
      description: "",
    };
  }
  componentDidMount() {
    this.fetchSigns();
  }
  handleChange = (event, state) => {
    this.setState(
      { [state]: event }
    );
  };
  handelSetSign = (event) => {
    this.setState({
      sign : JSON.parse(event)
    })
  }
  fetchSigns = async () => {
    await axios
      .get("http://127.0.0.1:3000/allsign")
      .then(signs => {
        if (signs.data.signs != null) {
          this.setState({
            signs: signs.data.signs,
            sign: signs.data.signs[0]
          });
        }
      })
      .catch(err => {
        // this.setState({
          // signs: Mockup.signs
        // });
        window.location.href = `/error/${err.response.status}`;
      });
  };
  handleBooking = () => {
    var bodyFormData = new FormData();
    bodyFormData.set("applicant_id", this.state.applicant);
    bodyFormData.append("organization", this.state.organization);
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
          title: `คุณ ${this.state.applicant} ยืนยันจะจองป้ายตามนี้ใช่ไหม?`,
          text: `ป้าย ${this.state.signname} วันที่ ${moment(
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
          console.log(bodyFormData);

          if (result.value) {
            // console.log(bodyFormData)
            this.postBooking(bodyFormData);
          }
        });
    }
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
        let booking = status.data;
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
  checkForm() {
    if (
      this.state.applicant !== "" &&
      this.state.organization !== "" &&
      this.state.signname !== ""
    ) {
      if (this.state.firstdate <= this.state.lastdate) {
        return true;
      }
      sweetalert.fire({
        type: "error",
        title: `คุณเลือกวันที่ไม่ถูกต้อง`
      });
      return false;
    }
    sweetalert.fire({
      type: "error",
      title: `คุณกรอกข้อมูลไม่ครบ`
    });
    return false;
  }

  setdayto = async dayto => {
    await this.setState({
      lastdate: dayto._d
    });
  };

  setdayfrom = async dayfrom => {
    await this.setState({
      firstdate: dayfrom._d
    });
  };

  render() {
    return (
      <div>
        <Helmet bodyAttributes={{ style: "background-color: #F8F9FA" }} />
        <HeadText name="Booking" />
        <div className="container  mt-2">
            <div className="form-group px-3 m-0 pb-4">
            <label className="m-2">ชื่อผู้ขอเช่า</label>
            <input
                type="text"
                className="form-control"
                value={this.state.applicant}
                onChange={e => this.handleChange(e.target.value, "applicant")}
            />
            <label className="m-2">ชื่อองค์กรผู้ขอเช่า</label>
            <input
                type="text"
                className="form-control"
                value={this.state.organization}
                onChange={e => this.handleChange(e.target.value, "organization")}
            />
            <label className="m-2">เหตุผลที่ขอเช่า</label>
            <textarea
              className="form-control"
              value={this.state.organization}
              onChange={e => this.handleChange(e.target.value, "description")}>
            </textarea>
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
                <div className="row m-2">
                  <div class="card mb-3">
                    <div class="row no-gutters">
                      <div class="col-md-4">
                        <img src={'img/'+this.state.sign.picture} class="p-3 card-img"/>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <span>ชื่อ : {this.state.sign.name}</span><br/>
                          <span>สถานที่ : {this.state.sign.location}</span><br/>
                          <span>จองก่อน : {this.state.sign.beforebooking} วัน</span><br/>
                          <span>จองได้มาก : {this.state.sign.limitdate} วัน</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <label className="m-2">วันที่ต้องการเช่า </label>
            <Pickdate
                dayto={this.setdayto}
                dayfrom={this.setdayfrom}
                selectedDayFrom={this.state.firstdate}
                selectedDayTo={this.state.lastdate}
            />
            </div>
            <div className="mx-3 mb-5">
              <button
                  type="button"
                  className="btn btn-outline-success mr-3"
                  onClick={this.handleBooking}
              >
                  ทำการจอง
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

export default Booking;
