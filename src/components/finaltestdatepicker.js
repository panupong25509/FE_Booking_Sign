import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import '../css/date-picker.css';
import moment from 'moment'
import axios from 'axios'

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChangeFrom = this.handleDayChangeFrom.bind(this);
    this.handleDayChangeTo = this.handleDayChangeTo.bind(this);
    this.state = {
      selectedDayFrom: undefined,
      selectedDayTo: undefined,
      isEmptyTo: true,
      isDisabledTo: false,
      start: "",
      end: "",
      result: [],
      days: [],
      disabledDaysFrom: [
        {before : new Date()},
        {daysOfWeek: [0, 6]}
      ] ,
      disabledDaysTo: [
        {before : new Date()},
        {daysOfWeek: [0, 6]}
      ] 
    };
  }

  componentDidMount() {
    this.fetchBookingDays()
    this.state.disabledDaysFrom.push({
      after: this.state.selectedDayTo !== undefined ? this.state.selectedDayTo : undefined
    })
  }

  fetchBookingDays = async () => {
    await axios.get('http://127.0.0.1:3000/getbookingdays/14').then((days) => {
      this.setState({
        days: days.data
      })
    })
    await this.state.days.map((day) => {
      let firstdate = new Date(moment(day.firstdate).format("YYYY-MM-DD"))
      firstdate = new Date(moment(firstdate.getFullYear()+"-"+(firstdate.getMonth()+1)+"-"+(firstdate.getDate()-1)).format("YYYY-MM-DD"))
      let lastdate = new Date(moment(day.lastdate).format("YYYY-MM-DD"))
      lastdate = new Date(moment(lastdate.getFullYear()+"-"+(lastdate.getMonth()+1)+"-"+(lastdate.getDate()+1)).format("YYYY-MM-DD"))
      this.state.disabledDaysTo.push({
        after: new Date(firstdate),
        before: new Date(lastdate),
      })
      this.state.disabledDaysFrom.push({
        after: new Date(firstdate),
        before: new Date(lastdate),
      })
    }) 
  }

  calDate = async () => {
    let tempresult = []
    if(this.state.start !== "" && this.state.end !== ""){
    let current = this.state.start.clone();
      while (current.day(7).isBefore(this.state.end)) {
          tempresult.push(current.clone());
      }
    }
    this.setState({
        result: tempresult,
    })
  }
  
  setFormatDate = async (start) => {
    if(start !== null) {
      let date = new Date(this.state.selectedDayFrom)
      await this.setState({
        start: moment(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
      })
    }
    let date = new Date(this.state.selectedDayTo)
    await this.setState({
      end: moment(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
    })
  }

  handleDayChangeFrom = async (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    await this.setState({
        selectedDayFrom: selectedDay,
        isEmptyFrom: !input.value.trim(),
        isDisabledFrom: modifiers.disabled === true,
    });
    this.state.disabledDaysTo.push({
        before: this.state.selectedDayFrom!== undefined ? this.state.selectedDayFrom : new Date()
    })
    this.setFormatDate("start")
    this.calDate()
    const dayfrom = this.state.start
    this.props.dayfrom(dayfrom)
  }

  handleDayChangeTo = async (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    await this.setState({
      selectedDayTo: selectedDay,
      isEmptyTo: !input.value.trim(),
      isDisabledTo: modifiers.disabled === true,
    });
    this.state.disabledDaysFrom.push({
      after: this.state.selectedDayTo !== undefined ? this.state.selectedDayTo : undefined
    })
    this.setFormatDate(null)
    this.calDate()
    const dayto = this.state.end
    this.props.dayto(dayto)
  }

  render() {
    return (
      <div>
        <DayPickerInput
          value={this.state.selectedDayFrom}
          onDayChange={this.handleDayChangeFrom}
          dayPickerProps={{
              selectedDays: this.state.selectedDayFrom,
              disabledDays: this.state.disabledDaysFrom
          }}
        />
        <span> To </span>
        <DayPickerInput
          value={this.state.selectedDayTo}
          onDayChange={this.handleDayChangeTo}
          dayPickerProps={{
            selectedDays: this.state.selectedDayTo,
            disabledDays: this.state.disabledDaysTo
          }}
        />
        {/* <button onClick={this.onConfirmClick}>Confirm</button> */}
        รวม {this.state.result.length * 2} ไม่วันทำการ
      </div>
    );
  }
}