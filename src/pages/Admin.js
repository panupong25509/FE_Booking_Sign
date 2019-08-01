import React from "react";
import "../assets/history.css";
import axios from "axios";
import moment from "moment";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import withAuth from "../hocs/withAuth";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table
} from "reactstrap";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }
  componentWillMount() {
    this.props.page("Admin");
    // this.fetchHistory();
  }
  fetchHistory = async () => {
    const AuthStr = "Bearer ".concat(cookie.load("jwt"));
    const headers = {
      headers: {
        Authorization: AuthStr
      }
    };
    await axios
      .get(process.env.REACT_APP_BE_PATH + "/booking", headers)
      .then(history => {
        console.log(history.data);
        if (history.data.bookings !== null) {
          this.setState({ history: history.data.bookings });
        }
      })
      .catch(err => {
        // if (err.response.status !== undefined) {
        //   window.location.href = `/error/${err.response.status}`;
        // }
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
                    {/* <CardSubtitle>History of your booking</CardSubtitle> */}
                  </div>
                  {/* <div className="ml-auto align-items-center">
                    <div className="">
                      <Link to="/booking">
                        <button type="button" className="btn btn-success">
                          Booking
                        </button>
                      </Link>
                    </div>
                  </div> */}
                </div>
                <div className="d-none d-md-block">
                  <Table className="no-wrap v-middle" responsive>
                    <thead>
                      <tr className="border-0">
                        <th className="border-0">Name</th>
                        <th className="border-0">Organization Name</th>
                        <th className="border-0">Place</th>
                        <th className="border-0">Booking date</th>
                        <th className="border-0">Status</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      {this.state.history.map(booking => {
                        return (
                          <tr>
                            <td>
                              {booking.applicant.fname +
                                " " +
                                booking.applicant.lname}
                            </td>
                            <td>{booking.applicant.organization}</td>
                            <td>{booking.sign.location}</td>
                            <td>
                              {moment(booking.first_date).format("DD/MM/YY")}-
                              {moment(booking.last_date).format("DD/MM/YY")}
                            </td>
                            <td>pending</td>
                          </tr>
                        );
                      })}
                    </tbody> */}
                  </Table>
                </div>
                <div className="d-block d-md-none">
                  <Table className="no-wrap v-middle" responsive>
                    <thead>
                      <tr className="border-0">
                        <th className="border-0">Place</th>
                        <th className="border-0">Booking date</th>
                        <th className="border-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.history.map(booking => {
                        return (
                          <tr>
                            <td>{booking.sign.location}</td>
                            <td>
                              {moment(booking.first_date).format("DD/MM/YY")}-
                              {moment(booking.last_date).format("DD/MM/YY")}
                            </td>
                            <td>
                              <button className="btn btn-primary">
                                Approve
                              </button>
                              <button className="btn btn-danger">
                                Reject
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
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
