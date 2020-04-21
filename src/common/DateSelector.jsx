import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { formatDate } from '../common/dateFormater';
import Header from './Header';
import './DateSelector.css';

function Day(props) {
  const { day, onSelect } = props;
  if (!day) {
    return <td className="null"></td>;
  } //day is null which means fill the block with grey
  const classes = [];
  const today = formatDate();

  if (day < today) {
    classes.push('disabled');
  } //if the day is early than today put with disabled CSS

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push('weekend');
  } //if the day is weekend, set with weekend CSS

  const displayDate = today === day ? 'Today' : new Date(day).getDate();
  //is today?
  return (
    <td className={classnames(classes)} onClick={() => onSelect(day)}>
      {displayDate}
    </td>
  ); //onSelect method is defined in App.js
}

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

function Week(props) {
  const { days, onSelect } = props;

  return (
    <tr className="date-table-days">
      {days.map((day, index) => {
        return <Day key={index} day={day} onSelect={onSelect} />;
      })}
    </tr>
  );
}

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function Month(props) {
  const { startingTimeInMonth, onSelect } = props;

  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);
  let dayList = [];
  while (currentDay.getMonth() === startDay.getMonth()) {
    dayList.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  //currentDay is used to generate the day list in this month,until the month increment
  dayList = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null)
    .concat(dayList);
  //fill the empty space of the day before the first day of this month
  const lastDay = new Date(dayList[dayList.length - 1]);
  dayList = dayList.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
  );
  //fill the empty space with the last day of the month
  const weeks = [];
  for (let row = 0; row < dayList.length / 7; ++row) {
    const week = dayList.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  } //seprate the weeks as group in an Array

  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>{dayjs(startDay).format('MMM YYYY')}</h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="date-table-weeks">
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th className="weekend">Sat</th>
          <th className="weekend">Sun</th>
        </tr>
        {weeks.map((week, index) => {
          return <Week key={index} days={week} onSelect={onSelect} />;
        })}
      </tbody>
    </table>
  );
}
Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default function DateSelector(props) {
  const { show, onSelect, onBack } = props;
  const thisMonth = new Date();
  thisMonth.setHours(0);
  thisMonth.setMinutes(0);
  thisMonth.setSeconds(0);
  thisMonth.setMilliseconds(0);
  thisMonth.setDate(1); //set the date with first day of this month

  const monthSequence = [thisMonth.getTime()];
  thisMonth.setMonth(thisMonth.getMonth() + 1);
  monthSequence.push(thisMonth.getTime());

  thisMonth.setMonth(thisMonth.getMonth() + 1);
  monthSequence.push(thisMonth.getTime());

  return (
    <div className={classnames('date-selector', { hidden: !show })}>
      <Header title="Depart Date" onBack={onBack} />
      <div className="date-selector-tables">
        {monthSequence.map((month) => {
          return (
            <Month
              key={month}
              startingTimeInMonth={month}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
