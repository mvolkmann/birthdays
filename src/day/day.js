/* eslint-disable jsx-a11y/accessible-emoji */
import {EasyContext, Input} from 'context-easy';
import {bool, number, string} from 'prop-types';
import React, {useContext} from 'react';

import {REST_URL_PREFIX} from '../rest';

import './day.scss';

const NBSP = '\u00A0';

let oldName = '';

function Day({classes, day, isBlank}) {
  const context = useContext(EasyContext);
  const {month} = context;
  const dayPath = `birthdays.${month}.${day}`;

  const addName = async () => {
    await context.set('day', day);
    await context.set('adding', true);
  };

  const deleteName = async name => {
    const res = await fetch(`${REST_URL_PREFIX}/${month}/${day}/${name}`, {
      method: 'DELETE'
    });
    if (res.ok) context.filter(dayPath, n => n !== name);
  };

  const finishModify = async namePath => {
    const newName = context.get(namePath);
    const url = `${REST_URL_PREFIX}/${month}/${day}/${oldName}/${newName}`;
    await fetch(url, {method: 'PUT'});

    // Remove duplicate.
    const names = context.get(dayPath);
    const index1 = names.indexOf(newName);
    const index2 = names.lastIndexOf(newName);
    if (index1 !== index2) {
      console.log('day.js finishModify: found duplicate');
      names.splice(index2, 1);
      context.set(dayPath, names);
    }

    await context.set('modifying', null);
    await context.set('name', '');
  };

  // Moves cursor to end of input value.
  const focus = (event, namePath) => {
    console.log('day.js focus: namePath =', namePath);
    oldName = context.get(namePath);
    console.log('day.js focus: oldName =', oldName);
    const {target} = event;
    const {length} = target.value;
    target.setSelectionRange(length, length);
  };

  const getModifyingKey = index => day + '.' + index;

  const modify = index => context.set('modifying', getModifyingKey(index));

  const renderNames = () => {
    const {birthdays, modifying, month} = context;
    const birthdaysInMonth = birthdays[month];
    const names = birthdaysInMonth ? birthdaysInMonth[day] || [] : [];
    return names.map((name, index) => {
      const isModifying = modifying === getModifyingKey(index);
      const namePath = dayPath + '.' + index;
      const afterModify = () => finishModify(namePath);
      return (
        <div className="line" key={'name' + index}>
          {isModifying ? (
            <Input
              autoFocus
              path={namePath}
              onBlur={afterModify}
              onFocus={event => focus(event, namePath)}
              onEnter={afterModify}
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
