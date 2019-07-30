import React from "react";

import '../assets/history.css'

import axios from "axios";
import moment from "moment";
import cookie from "react-cookies";

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

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }
  componentWillMount() {
    if (cookie.load("user") === undefined) {
      this.props.history.push("/login");
    } else {
      this.fetchHistory();
    }
  }
  fetchHistory = async () => {
    var bodyFormData = new FormData();
    bodyFormData.set("applicant_id", cookie.load("user").id);
    await axios({
      method: "post",
      url: process.env.REACT_APP_BE_PATH + "/booking",
      data: bodyFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(history => {
        if (history.data.bookings !== null) {
          this.setState({ history: history.data.bookings });
        }
      })
      .catch(err => {
        if (err.response.status !== undefined) {
          window.location.href = `/error/${err.response.status}`;
        }
      });
  };

  render() {
    return (
      <div className="page-content container-fluid"> 
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <div className="d-md-flex align-items-center">
                <div>
                  <CardTitle>Projects of the Month</CardTitle>
                  <CardSubtitle>Overview of Latest Month</CardSubtitle>
                </div>
                <div className="ml-auto d-flex no-block align-items-center">
                  <div className="dl">
                    <Input type="select" className="custom-select">
                      <option value="0">Monthly</option>
                      <option value="1">Daily</option>
                      <option value="2">Weekly</option>
                      <option value="3">Yearly</option>
                    </Input>
                  </div>
                </div>
              </div>
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
                <tbody>
                  {this.state.history.map(booking => {
                    return (
                      <tr>
                        <td>
                          <h5 className="mb-0 font-16 font-medium">
                            {booking.applicant.fname +
                              " " +
                              booking.applicant.lname}
                          </h5>
                        </td>
                        <td>{booking.applicant.organization}</td>
                        <td>{booking.sign.location}</td>
                        <td>
                          {moment(booking.first_date).format("DD/MM/YY")}
                          -{moment(booking.last_date).format("DD/MM/YY")}
                        </td>
                        <td>pending</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        </Row>
        </div>
    );
  }
}

export default History;
