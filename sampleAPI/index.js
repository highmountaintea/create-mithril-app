const path = require('path');
const express = require('express');
const cors = require('cors');

let port = 3750;

let app = express();

let corsOptions = {
  origin: /:\/\/(localhost|127.0.0.1)(:\d+)?$/
};

app.use(cors(corsOptions));

// example API handler
app.get('/api/test', (req, res) => {
  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true }));
  }, 1000);
});

app.listen(port, function () {
  console.log('started at ' + port);
});
