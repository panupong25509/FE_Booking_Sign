import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import '../css/date-picker.css';

import axios from 'axios'
import moment from 'moment'

let Arr = [
    {daysOfWeek: [0, 6]}
]


export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChangeFrom = this.handleDayChangeFrom.bind(this);
        this.handleDayChangeTo = this.handleDayChangeTo.bind(this);
        this.state = {
          selectedDayFrom: undefined,
          isEmptyFrom: true,
          isDisabledFrom: false,
          selectedDayTo: undefined,
          isEmptyTo: true,
          isDisabledTo: false,
          days: [],
          disabledDaysTo: [
            {daysOfWeek: [0, 6]}
          ] 
        };
      }
      
      componentDidMount() {
        this.testFL()
      }
      handleDayChangeFrom = async (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        await this.setState({
          selectedDayFrom: selectedDay,
          isEmptyFrom: !input.value.trim(),
          isDisabledFrom: modifiers.disabled === true,
        });
      }
      handleDayChangeTo(selectedDay, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
          selectedDayTo: selectedDay,
          isEmptyTo: !input.value.trim(),
          isDisabledTo: modifiers.disabled === true,
        });
      }
      testFL = async () => {
         await axios.get('http://127.0.0.1:3000/getbookingdays/13').then((days) => {
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
        })  
        console.log(this.state.disabledDaysTo) 
    }
    render() {
        const { selectedDayFrom, isDisabledFrom, isEmptyFrom } = this.state;
        const { selectedDayTo, isDisabledTo, isEmptyTo } = this.state;
        return (
          <div>
            <p>
              {isEmptyFrom && 'Please type or pick a day'}
              {!isEmptyFrom && !selectedDayFrom && 'This day is invalid'}
              {selectedDayFrom && isDisabledFrom && 'This day is disabled'}
              {selectedDayFrom &&
                !isDisabledFrom &&
                `You chose ${selectedDayFrom.toLocaleDateString()}`}
            </p>
            <DayPickerInput
              value={selectedDayFrom}
              onDayChange={this.handleDayChangeFrom}
              dayPickerProps={{
                selectedDays: selectedDayFrom,
                disabledDays: [
                    {before: new Date()},
                  {after: selectedDayTo},
                  {daysOfWeek: [0, 6]}
                ],
              }}
            />
            <p>
              {isEmptyTo && 'Please type or pick a day'}
              {!isEmptyTo && !selectedDayTo && 'This day is invalid'}
              {selectedDayTo && isDisabledTo && 'This day is disabled'}
              {selectedDayTo &&
                !isDisabledTo &&
                `You chose ${selectedDayTo.toLocaleDateString()}`}
            </p>
            <DayPickerInput
              value={selectedDayTo}
              onDayChange={this.handleDayChangeTo}
              dayPickerProps={{
                selectedDays: selectedDayTo,
                disabledDays: this.state.disabledDaysTo
              }}
            />
          </div>
        );
      }
}