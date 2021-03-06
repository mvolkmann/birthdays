import {EasyContext, Input} from 'context-easy';
import dateFns from 'date-fns';
import {number} from 'prop-types';
import React, {useContext} from 'react';

import Day from '../day/day';
import {REST_URL_PREFIX} from '../rest';

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
        day={dayNumber}
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
  const context = useContext(EasyContext);

  const cancel = async () => {
    await context.set('name', '');
    await context.set('adding', false);
  };

  const save = async event => {
    event.preventDefault();
    const {day, name} = context;

    const res = await fetch(`${REST_URL_PREFIX}/${month}/${day}/${name}`, {
      method: 'POST'
    });
    if (!res.ok) return;

    const path = `birthdays.${month}.${day}`;
    await context.transform(path, names => {
      // Don't allow duplicate names.
      if (names && names.includes(name)) return names;
      return names ? [...names, name] : [name];
    });
    await context.set('name', '');
    await context.set('adding', false);
  };

  function getModal(visible) {
    return visible ? (
      <div className="backdrop">
        <form className="modal">
          <label htmlFor="name">Name</label>
          <Input autoFocus path="name" />
          <div>
            <button onClick={save}>Save</button>
            <button onClick={cancel}>Cancel</button>
          </div>
        </form>
      </div>
    ) : null;
  }

  const firstOfMonth = new Date(year, month - 1);
  const firstDay = firstOfMonth.getDay();
  const daysInMonth = dateFns.getDaysInMonth(new Date(year, month - 1));
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
      {getModal(context.adding)}
    </div>
  );
}

Month.propTypes = {
  month: number.isRequired,
  year: number.isRequired
};

export default Month;
