import {EasyProvider} from 'context-easy';
import React, {Component} from 'react';
import Calendar from './calendar/calendar';
import './App.scss';

const today = new Date();
const initialState = {
  adding: false,
  birthdays: {},
  day: 0,
  month: today.getMonth() + 1,
  name: '',
  year: today.getFullYear()
};

class App extends Component {
  render() {
    return (
      <EasyProvider initialState={initialState} log validate>
        <div className="App">
          <Calendar />
        </div>
      </EasyProvider>
    );
  }
}

export default App;
