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

class History extends React.Component {
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
    this.props.page("Dashboard");
    this.fetchBookings();
  }

  fetchBookings = async () => {
    const AuthStr = "Bearer ".concat(cookie.load("jwt"));
    const headers = {
      headers: {
        Authorization: AuthStr
      }
    };
    await axios.get(`http://127.0.0.1:3000/booking/${this.state.numofpage}`,headers).then(booking => {
      this.setState({
        Bookings: booking.data.Bookings,
        totalpage: booking.data.TotalPage
      })
      console.log(this.state.Bookings)
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

  render() {
    return (
      <div className="page-content container-fluid">
        <Row>
          <Col lg="12">
            <Card>
              <CardBody className="shadow">
                <div className="d-flex justify-content-between">
                  <div>
                    <CardTitle>Dashboard</CardTitle>
                    <CardSubtitle>History of your booking</CardSubtitle>
                  </div>
                  <div className="ml-auto align-items-center">
                    <Link to="/booking">
                      <button type="button" className="btn btn-success">
                        Booking
                      </button>
                    </Link>
                  </div>
                </div>
                <div>
                  <Table className="no-wrap v-middle" responsive>
                    <thead>
                      <tr className="border-0">
                        <th className="border-0 d-none d-md-table-cell">Name</th>
                        <th className="border-0 d-none d-md-table-cell">
                          Organization Name
                        </th>
                        <th className="border-0">Place</th>
                        <th className="border-0">Booking date</th>
                        <th className="border-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Bookings.map(Bookings => {
                        return (
                          <tr>
                            <td className="d-none d-md-table-cell">
                              {Bookings.applicant.fname +
                                " " +
                                Bookings.applicant.lname}
                            </td>
                            <td className="d-none d-md-table-cell">
                              {Bookings.applicant.organization}
                            </td>
                            <td>{Bookings.sign.location}</td>
                            <td>
                              {moment(Bookings.first_date).format("DD/MM/YY")}-
                              {moment(Bookings.last_date).format("DD/MM/YY")}
                            </td>
                            <td>{Bookings.status}</td>
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

export default withAuth(History);
