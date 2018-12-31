//import dateFns from 'date-fns';
import {EasyContext} from 'context-easy';
import React, {useContext, useEffect} from 'react';

import Month from '../month/month';
import {REST_URL_PREFIX} from '../rest';

import './calendar.scss';

const MONTHS = [
  '', // so indexes start from 1
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;

function Calendar() {
  const context = useContext(EasyContext);
  const {month, year} = context;

  useEffect(async () => {
    const res = await fetch(REST_URL_PREFIX);
    const json = await res.json();
    context.set('birthdays', json);
  }, []);

  const changeMonth = async m => {
    let newYear;
    const {year} = context;

    if (year === todayYear) {
      if (m < todayMonth) newYear = year + 1;
    } else if (m >= todayMonth) newYear = year - 1;
    if (newYear) await context.set('year', newYear);

    await context.set('month', m);
  };

  return (
    <div className="calendar">
      <header>
        <div className="year">{context.year}</div>
        {MONTHS.map((monthName, index) =>
          index === 0 ? null : (
            <button
              className={index === context.month ? 'selected' : ''}
              key={'button' + index}
              onClick={() => changeMonth(index)}
            >
              {monthName}
            </button>
          )
        )}
      </header>
      <Month month={month} year={year} />
    </div>
  );
}

export default Calendar;
