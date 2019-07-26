import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeadText from "../components/HeaderPage";
import Helmet from "react-helmet";
import styled from "styled-components";
import moment from "moment";
import cookie from "react-cookies";

const MockupData = {
  bookings: [
    {
      id: 1,
      booking_code: "LIB1CODE29-06-201930-06-2019",
      applicant: "P",
      organization: "IT",
      firstdate: "29-06-2019",
      lastdate: "30-06-2019",
      sign: {
        name: "LIB1",
        location: "หน้าหอสมุด",
        limitdate: 3,
        beforedate: 4,
        picture: "LIB1.png"
      }
    }
  ]
};
const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 15px;
`;
const Box = styled.tr`
  border-right: hidden;
`;
class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }
  componentWillMount() {
    this.fetchHistory();
  }
  fetchHistory = async () => {
    if (cookie.load("user") === undefined) {
      this.props.history.push("/login");
    } else {
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
          this.setState({ history: history.data.bookings });
        })
        .catch(err => {
          if (err.response.status !== undefined) {
            window.location.href = `/error/${err.response.status}`;
          }
        });
    }
  };
  render() {
    return (
      <div>
        <Helmet bodyAttributes={{ style: "background-color: #F8F9FA" }} />
        <HeadText name="History" />
        <div className="container px-4 mt-2">
          <Table>
            <thead>
              <tr>
                <th className="px-3" style={{ width: "40%" }} scope="col">
                  APPLICANT & ORGANIZATION
                </th>
                <th className="px-3" style={{ width: "25%" }} scope="col">
                  LOCATION
                </th>
                <th className="px-3" style={{ width: "20%" }} scope="col">
                  DATE
                </th>
                <th
                  className="px-3 text-center"
                  style={{ width: "10%" }}
                  scope="col"
                >
                  STATUS
                </th>
                <th
                  className="px-3 text-center"
                  style={{ width: "5%" }}
                  scope="col"
                >
                  DETAIL
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.history.map(booking => {
                return (
                  <Box className="shadow-sm bg-white rounded">
                    <td className="px-3">
                      <div>
                        {booking.applicant.fname +
                          " " +
                          booking.applicant.lname}
                        <br />
                        {booking.applicant.organization}
                      </div>
                    </td>
                    <td className="px-3">{booking.sign.location}</td>
                    <td className="px-3">
                      {moment(booking.first_date).format("YYYY-MM-DD")}
                      <br /> to {moment(booking.last_date).format("YYYY-MM-DD")}
                    </td>
                    <td className="px-3 text-center">pending</td>
                    <td className="px -3 text-center">
                      <i className="fa fa-info" />
                    </td>
                  </Box>
                );
              })}
            </tbody>
          </Table>
          <div className="float-right">
            <Link to="/">
              <button type="button" class="btn btn-outline-danger">
                กลับ
              </button>
            </Link>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

export default History;
