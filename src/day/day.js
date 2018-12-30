import {bool, number, string} from 'prop-types';
import React from 'react';
import './day.scss';

const NBSP = '\u00A0';

function Day({classes, dayNumber, isBlank}) {
  const names = ['Mark Volkmann', 'Tami Volkmann'];

  const add = () => {
    console.log('day.js add: entered');
  };

  const renderHeader = () => (
    <header key="header">
      <div className="number">{isBlank ? NBSP : dayNumber}</div>
      <button className="add" onClick={add}>
        +
      </button>
    </header>
  );

  const renderNames = () =>
    names.map((name, index) => (
      <div className="name" key={'name' + index}>
        {name}
      </div>
    ));

  return (
    <div className={classes}>{!isBlank && [renderHeader(), renderNames()]}</div>
  );
}

Day.propTypes = {
  classes: string,
  dayNumber: number,
  isBlank: bool
};

export default Day;
