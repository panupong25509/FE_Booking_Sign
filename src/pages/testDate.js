import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import '../css/date-picker.css';

const Days = [
    {
        firstdate: "2019-07-20",
        lastdate: "2019-07-25"
    },
    {
        firstdate: "2019-08-20",
        lastdate: "2019-08-25"
    }
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
        };
      }
    
      handleDayChangeFrom(selectedDay, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
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
          </div>
        );
      }
}