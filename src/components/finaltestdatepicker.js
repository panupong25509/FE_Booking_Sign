import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import '../css/date-picker.css';
import moment from 'moment'

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
          start: "",
          daystart: 0,
          mouthstart: 0,
          yearstart: 0,
          end: "",
          result: [],
          numresult: 0,
          day: 0,
        };
      }

      calDate = async () => {
        let tempresult = []
        if(this.state.start != "" && this.state.end != ""){
          let current = this.state.start.clone();
          while (current.day(7 + this.state.day).isBefore(this.state.end)) {
            tempresult.push(current.clone());
          }
        }
        this.setState({
          result: tempresult,
        })
      }

      handleDayChangeFrom = async (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        await this.setState({
          selectedDayFrom: selectedDay,
          isEmptyFrom: !input.value.trim(),
          isDisabledFrom: modifiers.disabled === true,
        });
        this.setFormatStart()
        this.setStart(this.state.daystart, this.state.mouthstart, this.state.yearstart)
        this.calDate()
      }

      setFormatStart  = async () => {
        await this.setState({
          daystart: new Date(this.state.selectedDayFrom).getDate(),
          mouthstart: new Date(this.state.selectedDayFrom).getMonth(),
          yearstart: new Date(this.state.selectedDayFrom).getFullYear(),
        })
      }

      setStart = async (daystart, mouthstart, yearstart) => {
        await this.setState({
          start: moment(`${yearstart}-${mouthstart+1}-${daystart}`)
        })
      }

      handleDayChangeTo = async (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        await this.setState({
          selectedDayTo: selectedDay,
          isEmptyTo: !input.value.trim(),
          isDisabledTo: modifiers.disabled === true,
        });
        this.setFormatEnd()
        this.setEnd(this.state.dayend, this.state.mouthend, this.state.yearend)
        this.calDate()
      }

      setFormatEnd  = async () => {
        await this.setState({
          dayend: new Date(this.state.selectedDayTo).getDate(),
          mouthend: new Date(this.state.selectedDayTo).getMonth(),
          yearend: new Date(this.state.selectedDayTo).getFullYear(),
        })
      }

      setEnd = async (dayend, mouthend, yearend) => {
        await this.setState({
          end: moment(`${yearend}-${mouthend+1}-${dayend}`)
        })
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
                disabledDays: [
                  {daysOfWeek: [0, 6]},
                  {before: selectedDayFrom !== undefined ? selectedDayFrom : new Date()},
                  Days.map((day) => {
                      return (
                          {
                            after: new Date(day.firstdate),
                            before: new Date(day.lastdate),
                          } 
                      )
                  }),
                ],
              }}
            />
            รวม {this.state.result.length * 2} วันทำการ
          </div>
        );
      }
}