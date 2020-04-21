import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import './DepartDate.css';
import { formatDate } from '../common/dateFormater';

export default function DepartDate(props) {
  const { time, onClick } = props;

  const formatedDate = formatDate(time);
  const departDay = new Date(formatedDate);
  const departDateValue = useMemo(() => {
    return dayjs(time).format('YYYY-MM-DD');
  }, [time]);

  const isToday = formatedDate === formatDate();
  //formateDate() return formated Date.now() as the init value

  const weekdayValue =
    [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][departDay.getDay()] + (isToday ? '(today)' : '');

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateValue} />
      {/* set a hidden input for further form submit */}
      {departDateValue}
      <span className="depart-week"> {weekdayValue}</span>
    </div>
  );
}

DepartDate.prototypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
