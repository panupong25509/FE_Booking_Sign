import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import withAuth from "../hocs/withAuth";
import moment from "moment";
import "../assets/dashboard.css";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      numofpage: 1,
      totalpage: 0,
      booking: [],
      Order: "first_date asc"
    };
  }
  componentDidMount() {
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
    await axios(
      `http://127.0.0.1:3000/booking/${this.props.id}`,
      headers
    ).then(async (booking) => {
      await this.setState({
        booking: booking.data,
      });
      console.log(booking.data)
    });
  };

  render() {
    return (
      <div className="page-content container-fluid">
        <Row>
          <Col lg="12">
            <Card>
              <CardBody className="shadow">
                <div className="d-flex justify-content-between">
                  <div>
                    <CardTitle>Detail</CardTitle>
                    {this.state.booking.map((bookings) => {
                      return (
                        <Row className="col-12 m-0 p-0">
                          <div className="row no-gutters col-sm-6 col-12 p-0">
                            <div className="col-12 p-3">
                              <label>Sign Picture</label>
                              <img
                                alt="Sign"
                                src={"/img/" + bookings.sign.picture}
                                className="align-middle card-img"
                              />
                            </div>
                          </div>
                          <div className="row no-gutters col-sm-6 col-12 p-0">
                            <div className="col-12 p-3">
                              <label>Your Poster</label>
                              <img
                                alt="Sign"
                                src={"/img/applicant_poster/" + bookings.apllicant_poster}
                                className="align-middle card-img"
                              />
                            </div>
                          </div>
                          <div className="col-12 my-3">
                            <div className="card-body p-0">
                              <span>
                                Name<span> : </span>
                                {bookings.applicant.fname} {bookings.applicant.lname}
                              </span>
                              <br />
                              <span>
                                Sign<span> : </span>
                                {bookings.sign.name}
                              </span>
                              <br />
                              <span>
                                Date<span> : </span>
                                {moment(bookings.first_date).format("DD/MM/YY")}
                                   - {moment(bookings.last_date).format("DD/MM/YY")}
                              </span>
                              <br />
                              <span>
                                Status<span> : </span>
                                {bookings.status}
                              </span>
                              <br />
                              {/* <span>
                                <span> : </span>
                                {bookings.sign.limitdate} days
                              </span> */}
                            </div>
                          </div>
                        </Row>
                      )
                     })}
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
