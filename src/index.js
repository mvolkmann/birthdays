import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';

async function serviceWorkerSetup() {
  const {serviceWorker} = navigator;
  if (!serviceWorker) {
    console.error('serviceWorker is not supported by this browser.');
    return;
  }

  try {
    const registration = await serviceWorker.register('/service-worker.js');
    console.log('Service Worker registered with scope', registration.scope);
  } catch (err) {
    console.error('Service Worker registration failed:', err);
  }
}

serviceWorkerSetup();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
//serviceWorker.register();
