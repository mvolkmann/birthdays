/* eslint-disable jsx-a11y/accessible-emoji */
import {EasyContext} from 'context-easy';
import {bool, number, string} from 'prop-types';
import React, {useContext} from 'react';
import './day.scss';

const NBSP = '\u00A0';

function Day({classes, day, isBlank}) {
  const context = useContext(EasyContext);

  const addName = async () => {
    await context.set('day', day);
    await context.set('adding', true);
  };

  const deleteName = name => {
    console.log('day.js deleteName: name =', name);
    const path = `birthdays.${context.month}.${day}`;
    console.log('day.js deleteName: path =', path);
    context.filter(path, n => n !== name);
  };

  const renderHeader = () => (
    <header key="header">
      <div className="number">{isBlank ? NBSP : day}</div>
      <button className="add" onClick={addName}>
        &#x2716;
      </button>
    </header>
  );

  const renderNames = () => {
    const {birthdays, month} = context;
    const birthdaysInMonth = birthdays[month];
    const names = birthdaysInMonth ? birthdaysInMonth[day] || [] : [];
    return names.map((name, index) => (
      <div className="name" key={'name' + index}>
        {name}
        <button className="delete" onClick={() => deleteName(name)}>
          &#x2716;
        </button>
      </div>
    ));
  };

  return (
    <div className={classes}>{!isBlank && [renderHeader(), renderNames()]}</div>
  );
}

Day.propTypes = {
  classes: string.isRequired,
  day: number.isRequired,
  isBlank: bool
};

export default Day;
