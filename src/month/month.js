import {number} from 'prop-types';
import React from 'react';
import dateFns from 'date-fns';
import Day from '../day/day';
import './month.scss';

const DAYS_IN_WEEK = 7;
const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const getDayNames = () => (
  <div className="day-names">
    {DAYS.map(day => (
      <div className="day-name" key={day}>
        {day}
      </div>
    ))}
  </div>
);

function getWeek(weekNumber, start, daysInMonth) {
  const days = [];
  let foundLeft = false;

  for (let d = 0; d < DAYS_IN_WEEK; d++) {
    const dayNumber = start + d;
    const isBlank = dayNumber < 1 || dayNumber > daysInMonth;
    const needLeft = !isBlank && !foundLeft;
    const classes =
      'day' +
      (isBlank ? ' blank' : ' real') +
      (needLeft ? ' left' : '') +
      (weekNumber === 2 && dayNumber <= 7 ? ' top' : '');
    days.push(
      <Day
        classes={classes}
        dayNumber={dayNumber}
        isBlank={isBlank}
        key={'day' + d}
      />
    );
    if (needLeft) foundLeft = true;
  }
  return (
    <div className="week" key={'week' + weekNumber}>
      {days}
    </div>
  );
}

function Month({month, year}) {
  console.log('month.js Month: month =', month);
  console.log('month.js Month: year =', year);
  const firstOfMonth = new Date(year, month);
  const firstDay = firstOfMonth.getDay();
  const daysInMonth = dateFns.getDaysInMonth(new Date(year, month));
  const daysRemainingInFirstWeek = DAYS_IN_WEEK - firstDay;
  const weekCount =
    1 + Math.ceil((daysInMonth - daysRemainingInFirstWeek) / DAYS_IN_WEEK);

  let start = daysRemainingInFirstWeek - DAYS_IN_WEEK + 1;
  const rows = [];
  for (let weekNumber = 1; weekNumber <= weekCount; weekNumber++) {
    rows.push(getWeek(weekNumber, start, daysInMonth));
    start += 7;
  }

  return (
    <div className="month">
      {getDayNames()}
      {rows}
    </div>
  );
}

Month.propTypes = {
  month: number,
  year: number
};

export default Month;
