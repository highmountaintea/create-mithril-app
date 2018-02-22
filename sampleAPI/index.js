const path = require('path');
const express = require('express');
const cors = require('cors');

let port = 3750;

let app = express();

let corsOptions = {
    origin: function (origin, callback) {
      if (origin.match(/^http:\/\/(localhost|127.0.0.1)(:\d+)?$/) != null) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
}

// example API handler
app.get('/api/test', cors(corsOptions), (req, res) => {
  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true }));
  }, 1500);
});

app.listen(port, function () {
  console.log('started at ' + port);
});
