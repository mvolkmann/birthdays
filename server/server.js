'use strict';
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const NOT_FOUND = 404;

// Initial data
const birthdays = {
  4: {
    16: ['Mark']
  },
  9: {
    9: ['Tami']
  }
};

const app = express();
app.use(cors());
app.use(morgan('short')); // logging
app.use(express.static('../public'));

// Gets all the birthdays.
app.get('/birthdays', (req, res) => {
  res.json(birthdays);
});

// Deletes a specific birthday.
app.delete('/birthdays/:month/:day/:name', (req, res) => {
  const {month, day, name} = req.params;
  const monthObj = birthdays[month];
  if (!monthObj) return res.send(NOT_FOUND);

  const names = monthObj[day];
  if (!names) return res.send(NOT_FOUND);

  if (!names.includes(name)) return res.send(NOT_FOUND);

  monthObj[day] = names.filter(n => n !== name);
  res.send();
});

// Adds a birthday.
app.post('/birthdays/:month/:day/:name', (req, res) => {
  const {month, day, name} = req.params;
  let monthObj = birthdays[month];
  if (!monthObj) monthObj = birthdays[month] = {};
  let names = monthObj[day];
  if (!names) names = monthObj[day] = [];
  if (!names.includes(name)) names.push(name);
  res.send();
});

// Updates a name.
app.put('/birthdays/:month/:day/:oldName/:newName', (req, res) => {
  const {month, day, oldName, newName} = req.params;
  const monthObj = birthdays[month];
  if (!monthObj) return res.send(NOT_FOUND);

  const names = monthObj[day];
  if (!names) return res.send(NOT_FOUND);

  if (!names.includes(oldName)) return res.send(NOT_FOUND);

  if (names.includes(newName)) {
    // Delete the old name.
    monthObj[day] = names.filter(n => n !== oldName);
  } else {
    // Replace the old name with the new name.
    monthObj[day] = names.map(n => (n === oldName ? newName : n));
  }

  res.send();
});

const port = 3001;
app.listen(port, () => console.log('listening on port', port));
