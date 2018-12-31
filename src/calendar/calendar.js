//import dateFns from 'date-fns';
import {EasyContext} from 'context-easy';
import React, {useContext} from 'react';
import Month from '../month/month';
import './calendar.scss';

const MONTHS = [
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
const todayMonth = today.getMonth();

function Calendar() {
  const context = useContext(EasyContext);
  const {month, year} = context;

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
        {MONTHS.map((m, index) => (
          <button
            className={index === context.month ? 'selected' : ''}
            key={'button' + index}
            onClick={() => changeMonth(index)}
          >
            {m}
          </button>
        ))}
      </header>
      <Month month={month} year={year} />
    </div>
  );
}

export default Calendar;
