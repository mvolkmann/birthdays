import {number} from 'prop-types';
import React, {useState} from 'react';
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

function getWeek(weekNumber, start, daysInMonth, setModalVisible) {
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
        setModalVisible={setModalVisible}
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
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');

  const cancel = () => setModalVisible(false);

  const save = () => {
    setModalVisible(false);
  };

  function getModal(visible) {
    return visible ? (
      <div className="backdrop">
        <div className="modal">
          <label htmlFor="name">Name</label>
          <input onChange={e => setName(e.target.value)} value={name} />
          <div>
            <button onClick={cancel}>Cancel</button>
            <button onClick={save}>Save</button>
          </div>
        </div>
      </div>
    ) : null;
  }

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
    rows.push(getWeek(weekNumber, start, daysInMonth, setModalVisible));
    start += 7;
  }

  return (
    <div className="month">
      {getDayNames()}
      {rows}
      {getModal(modalVisible)}
    </div>
  );
}

Month.propTypes = {
  month: number,
  year: number
};

export default Month;
