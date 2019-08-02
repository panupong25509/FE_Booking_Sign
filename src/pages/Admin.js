import React from "react";
import "../assets/history.css";
import axios from "axios";
import moment from "moment";
import cookie from "react-cookies";
// import { Link, Redirect } from "react-router-dom";
import withAuth from "../hocs/withAuth";
import sweetalert from "sweetalert2";
import '../assets/admin.css'

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Table
} from "reactstrap";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      numofpage: 1,
      totalpage: 0,
      Bookings: [],
    };
  }
  componentWillMount() {
    this.props.page("Admin");
    // this.fetchBooking();
    this.fetchBookings();
  }

  fetchBookings = async () => {
    const AuthStr = "Bearer ".concat(cookie.load("jwt"));
    const headers = {
      headers: {
        Authorization: AuthStr
      }
    };
    await axios.get(`http://127.0.0.1:3000/admin/booking/${this.state.numofpage}`,headers).then(booking => {
      this.setState({
        Bookings: booking.data.Bookings,
        totalpage: booking.data.TotalPage
      })
      
    })
  }

  async pluspage() {
    if(this.state.totalpage > this.state.numofpage){
      await this.setState({numofpage : this.state.numofpage+1})
    }
    this.fetchBookings()
  }

  async minuspage() {
    if(this.state.numofpage > 1){
      await this.setState({ numofpage: this.state.numofpage-1 })
    }
    this.fetchBookings()
  }
  
  Approve = id => {
    sweetalert
      .fire({
        title: "Confirm to approve?",
        showCancelButton: true,
        confirmButtonColor: "#28A745",
        cancelButtonColor: "#DC3545",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      })
      .then(result => {
        if (result.value) {
          const AuthStr = "Bearer ".concat(cookie.load("jwt"));
          const headers = {
            Authorization: AuthStr
          };
          var bodyFormData = new FormData();
          bodyFormData.set("id", id);
          axios({
            method: "post",
            url: process.env.REACT_APP_BE_PATH + "/admin/booking/approve",
            data: bodyFormData,
            headers: headers
          })
            .then(async status => {
              await sweetalert.fire({
                type: "success",
                title: "Success",
                showConfirmButton: false,
                timer: 1000
              });
              window.location.reload();
            })
            .catch(err => {
              sweetalert.fire({
                type: "error",
                title: `${err.response.data.message}`,
                confirmButtonColor: "#28A745"
              });
            });
        }
      });
  };

  Reject = async id => {
    await sweetalert.fire({
      title: "Confirm to Reject?",      
      input: 'textarea',
      inputPlaceholder: 'Type your message here...',
      showCancelButton: true,
      confirmButtonColor: "#28A745",
      cancelButtonColor: "#DC3545",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    })
      .then(function(result) {
        if (result.value) {
          const AuthStr = "Bearer ".concat(cookie.load("jwt"));
          const headers = {
            Authorization: AuthStr
          };
          var bodyFormData = new FormData();
          bodyFormData.set("id", id);
          bodyFormData.set("comment", result.value);
          axios({
            method: "post",
            url: process.env.REACT_APP_BE_PATH + "/admin/booking/reject",
            data: bodyFormData,
            headers: headers
          })
            .then(async() => {
              await sweetalert.fire({
                type: "success",
                title: "Success",
                showConfirmButton: false,
                timer: 1000
              });
              window.location.reload();
            })
            .catch(err => {
              sweetalert.fire({
                type: "error",
                title: `${err.response.data.message}`,
                confirmButtonColor: "#28A745"
              });
            });
        }
      });
  };

  

  render() {
    return (
      <div className="page-content container-fluid">
        <Row>
          <Col lg="12">
            <Card>
              <CardBody className="shadow">
                <div className="d-md-flex align-items-center">
                  <div>
                    <CardTitle>Admin</CardTitle>
                  </div>
                </div>
                <div>
                  <Table className="no-wrap v-middle" responsive>
                    <thead>
                      <tr className="border-0">
                        <th className="border-0 d-none d-md-table-cell">
                          Name
                        </th>
                        <th className="border-0 d-none d-md-table-cell">
                          Organization Name
                        </th>
                        <th className="border-0">Place</th>
                        <th className="border-0">Booking date</th>
                        <th className="border-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Bookings.map(booking => {
                        return (
                          <tr>
                            <td className="d-none d-md-table-cell">
                              {booking.applicant.fname +
                                " " +
                                booking.applicant.lname}
                            </td>
                            <td className="d-none d-md-table-cell">
                              {booking.applicant.organization}
                            </td>
                            <td>{booking.sign.location}</td>
                            <td>
                              {moment(booking.first_date).format("DD/MM/YY")}-
                              {moment(booking.last_date).format("DD/MM/YY")}
                            </td>
                            <td>
                              <div className="btn-group font-s" role="group" aria-label="Basic example">
                                <button onClick={() => this.Approve(booking.id)} type="button" className="font-s btn btn-success">
                                  Approve
                                </button>
                                <button type="button" onClick={() => this.Reject(booking.id)} className="font-s btn btn-danger">
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <div>
                    <button type="button" className="mx-4 btn btn-success" onClick={() => this.minuspage()}>Back</button>
                    <span>{this.state.numofpage}/{this.state.totalpage}</span>
                    <button type="button" className="mx-4 btn btn-success" onClick={() => this.pluspage()}>Next</button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAuth(Admin, true);
