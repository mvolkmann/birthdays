/* eslint-disable jsx-a11y/accessible-emoji */
import {EasyContext, Input} from 'context-easy';
import {bool, number, string} from 'prop-types';
import React, {useContext} from 'react';
import './day.scss';

const NBSP = '\u00A0';

function Day({classes, day, isBlank}) {
  const context = useContext(EasyContext);
  const {month} = context;

  const addName = async () => {
    await context.set('day', day);
    await context.set('adding', true);
  };

  const deleteName = name => context.filter(getDayPath(), n => n !== name);

  const finishModify = async () => {
    console.log('day.js finishModify: entered');
    await context.delete('modifying');
    await context.delete('name');
    console.log('day.js finishModify: exiting');
  };

  const getDayPath = () => `birthdays.${month}.${day}`;

  const getModifyingKey = name => day + '|' + name;

  const modify = index => context.set('modifying', getModifyingKey(index));

  const renderNames = () => {
    const {birthdays, modifying, month} = context;
    const birthdaysInMonth = birthdays[month];
    const names = birthdaysInMonth ? birthdaysInMonth[day] || [] : [];
    return names.map((name, index) => {
      const isModifying = modifying === getModifyingKey(index);
      const path = getDayPath() + '.' + index;
      console.log('day.js renderNames: path =', path);
      console.log('day.js renderNames: value =', context.get(path));
      return (
        <div className="line" key={'name' + index}>
          {isModifying ? (
            <Input path={path} onBlur={finishModify} />
          ) : (
            <div className="name" onClick={() => modify(index)}>
              {name}
            </div>
          )}
          <button className="delete" onClick={() => deleteName(name)}>
            &#x2716;
          </button>
        </div>
      );
    });
  };

  const renderTop = () => (
    <div className="top" key="top">
      <div className="number" onClick={addName}>
        {isBlank ? NBSP : day}
      </div>
      <button className="add" onClick={addName}>
        &#x2716;
      </button>
    </div>
  );

  return (
    <div className={classes}>{!isBlank && [renderTop(), renderNames()]}</div>
  );
}

Day.propTypes = {
  classes: string.isRequired,
  day: number.isRequired,
  isBlank: bool
};

export default Day;
