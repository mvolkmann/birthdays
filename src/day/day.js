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
    await context.set('modifying', null);
    await context.set('name', '');
  };

  // Moves cursor to end of input value.
  const focus = event => {
    const {target} = event;
    const {length} = target.value;
    target.setSelectionRange(length, length);
  };

  const getDayPath = () => `birthdays.${month}.${day}`;

  const getModifyingKey = index => day + '.' + index;

  const modify = index => context.set('modifying', getModifyingKey(index));

  const renderNames = () => {
    const {birthdays, modifying, month} = context;
    const birthdaysInMonth = birthdays[month];
    const names = birthdaysInMonth ? birthdaysInMonth[day] || [] : [];
    return names.map((name, index) => {
      const isModifying = modifying === getModifyingKey(index);
      const path = getDayPath() + '.' + index;
      return (
        <div className="line" key={'name' + index}>
          {isModifying ? (
            <Input
              autoFocus
              path={path}
              onBlur={finishModify}
              onFocus={focus}
              onEnter={finishModify}
            />
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
