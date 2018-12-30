//import dateFns from 'date-fns';
import React, {useState} from 'react';
import Month from '../month/month';
import './calendar.scss';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();

function Calendar() {
  const [month, setMonth] = useState(todayMonth);
  const [year, setYear] = useState(todayYear);

  const changeMonth = m => {
    if (year === todayYear) {
      if (m < todayMonth) setYear(year + 1);
    } else {
      if (m >= todayMonth) setYear(year - 1);
    }
    setMonth(m);
  };

  return (
    <div className="calendar">
      <header>
        <div>{year}</div>
        {MONTHS.map((m, index) => (
          <button
            className={index === month ? 'selected' : ''}
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
