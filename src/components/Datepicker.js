import React from "react";
import axios from "axios";
import moment from "moment";

import "react-day-picker/lib/style.css";
import "../assets/datepicker.css";
import DayPicker, { DateUtils } from "react-day-picker";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.state = { bookingDates: [] };
  }
  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  }
  isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };
  handleDayClick = async (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      await this.setState({
        from: day,
        to: null,
        enteredTo: null
      });
    } else {
      await this.setState({
        to: day,
        enteredTo: day
      });
    }
    this.props.date({
      firstdate: this.state.from,
      lastdate: this.state.to,
    });
  };
  handleDayMouseEnter = day => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  };
  handleResetClick = () => {
    this.setState(this.getInitialState());
  };

  fetchBookingDates = async (signid) => {
    await axios.get(`http://127.0.0.1:3000/getbookingdays/${signid}`).then(dates => {
      this.addBookingDates(dates.data);
    });
  };
  
  addBookingDates = async dates => {
    let bookingDates = [];
    await dates.map(date => {
      let firstdate = new Date(moment(date.firstdate).format("YYYY-MM-DD"));
      let lastdate = new Date(moment(date.lastdate).format("YYYY-MM-DD"));
      bookingDates.push(
        { after: firstdate, before: lastdate },
        firstdate,
        lastdate
      );
    });
    this.setState({ bookingDates: bookingDates });
  };

  handleFetchSignId = (signid) => {
    this.fetchBookingDates(signid)
  }

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = {
      start: from,
      end: enteredTo,
      birthday: this.state.bookingDates
    };
    const modifiersStyles = {
      birthday: {
        color: "white",
        backgroundColor: "red"
      }
    };
    const disabledDays = [{ before: this.state.from }, { daysOfWeek: [0, 6] }, { before: new Date() }];
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <div className="container p-0 ">
        <DayPicker
          className="Range bg-white border "
          numberOfMonths={2}
          fromMonth={from}
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
        />
        <div className = "mt-2">
          {!from && !to && "Please select the first day."}
          {from && !to && "Please select the last day."}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{" "}
          {from && to && (
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </div>
      </div>
    );
  }
}
