const express = require('express');

let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

let app = express();

app.use(express.static('./temp'));
app.use(express.static('./public'));

// example API handler
app.get('/api/test', (req, res) => {
  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true }));
  }, 1500);
});

app.listen(port, function () {
  console.log('started at ' + port);
});
