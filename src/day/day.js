/* eslint-disable jsx-a11y/accessible-emoji */
import {bool, func, number, string} from 'prop-types';
import React from 'react';
import './day.scss';

const NBSP = '\u00A0';

function Day({classes, dayNumber, isBlank, setModalVisible}) {
  const names = ['Mark Volkmann', 'Tami Volkmann'];

  const addName = () => {
    console.log('day.js addName: entered');
    setModalVisible(true);
  };

  const deleteName = () => {
    console.log('day.js deleteName: entered');
  };

  const renderHeader = () => (
    <header key="header">
      <div className="number">{isBlank ? NBSP : dayNumber}</div>
      <button className="add" onClick={addName}>
        &#x2795;
      </button>
    </header>
  );

  const renderNames = () =>
    names.map((name, index) => (
      <div className="name" key={'name' + index}>
        {name}
        <button className="delete" onClick={deleteName}>
          &#x2716;
        </button>
      </div>
    ));

  return (
    <div className={classes}>{!isBlank && [renderHeader(), renderNames()]}</div>
  );
}

Day.propTypes = {
  classes: string.isRequired,
  dayNumber: number.isRequired,
  isBlank: bool,
  setModalVisible: func.isRequired
};

export default Day;
