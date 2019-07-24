import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderPage from "../components/HeaderPage";
import Helmet from "react-helmet";
import styled from "styled-components";

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
    },
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
    await axios
      .get("http://127.0.0.1:3000/allbooking")
      .then(history => {
        this.setState({ history: history.data.bookings });
      })
      .catch(err => {
        this.setState({ history: MockupData.bookings });
      });
  };
  render() {
    console.log(MockupData, this.state.history);
    return (
      <div className="container-fluid">
        <Helmet bodyAttributes={{ style: "background-color: #F8F9FA" }} />
        <HeaderPage name="History" />
        <div>
          <Table>
            <thead>
              <tr>
                <th className="pl-3 pr-3" style={{ width: "40%" }} scope="col">
                  APPLICANT & ORGANIZATION
                </th>
                <th className="pl-3 pr-3" style={{ width: "25%" }} scope="col">
                  LOCATION
                </th>
                <th className="pl-3 pr-3" style={{ width: "20%" }} scope="col">
                  DATE
                </th>
                <th
                  className="pl-3 pr-3 text-center"
                  style={{ width: "10%" }}
                  scope="col"
                >
                  STATUS
                </th>
                <th
                  className="pl-3 pr-3 text-center"
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
                    <td className="pl-3 pr-3">{booking.booking_code}</td>
                    <td className="pl-3 pr-3">{booking.sign.location}</td>
                    <td className="pl-3 pr-3">
                      {booking.firstdate}
                      <br /> to {booking.lastdate}
                    </td>
                    <td className="p-3 text-center">pending</td>
                    <td className="p-3 text-center">
                      <i className="fa fa-info" />
                    </td>
                  </Box>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div />
      </div>
      //   </Helmet>
    );
  }
}

export default History;
