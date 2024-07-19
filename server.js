const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from the 'public' directory
server.use(express.static(path.join(__dirname, 'public')));

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Serve the madlib.html file from the public folder
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'madlib.html'));
});

// Handle Mad Libs form submission
server.post('/submit', (req, res) => {
  const { adjective1, pluralNoun, verb, place, adjective2 } = req.body;

  if (!adjective1 || !pluralNoun || !verb || !place || !adjective2) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/">Go Back to Form</a>
    `);
    return;A
  }

  const madLib = `It was a(n) ${adjective1} day. The ${pluralNoun} decided to ${verb} to the ${place}. It was a very ${adjective2} experience.`;

  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="/">Go Back to Form</a>
  `);
});

let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

server.listen(port, () => console.log('Ready on localhost!'));
