const express = require('express');

let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

let app = express();

app.use(express.static('./temp'));
app.use(express.static('./public'));

app.listen(port, function () {
  console.log('started at ' + port);
});
