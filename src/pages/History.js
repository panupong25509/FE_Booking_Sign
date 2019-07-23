import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const MockupData = {
  bookings: [
      {
          id:1,
          booking_code: "LIB1CODE29-06-201930-06-2019",
          applicant: "P",
          organization: "IT",
          firstdate: "29-06-2019",
          lastdate: "30-06-2019",
          sign : {
              name:"LIB1",
              location:"หน้าหอสมุด",
              limitdate: 3,
              beforedate: 4,
              picture: "LIB1.png"
          }
      }
  ]
};
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
        this.setState({ history: MockupData.bookings})
      });
  };
  render() {
      console.log(MockupData, this.state.history)
    return (
      <div>
        <div>Booking Sign</div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Booking Code</th>
              <th scope="col">Sign name</th>
              <th scope="col">Location</th>
              <th scope="col">Applicant</th>
              <th scope="col">Organization</th>
              <th scope="col">First Date</th>
              <th scope="col">Last Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.history.map(booking => {
              return (
                <tr>
                  <td>{booking.booking_code}</td>
                  <td>{booking.sign.name}</td>
                  <td>{booking.sign.location}</td>
                  <td>{booking.applicant}</td>
                  <td>{booking.organization}</td>
                  <td>{moment(booking.first_date).format("YYYY-MM-DD")}</td>
                  <td>{moment(booking.last_date).format("YYYY-MM-DD")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <Link to="/">
            <button type="button" class="btn btn-warning">
              กลับ
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default History;
