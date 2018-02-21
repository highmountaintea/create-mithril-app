const path = require('path');
const express = require('express');

let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

let app = express();

// example API handler
app.get('/api/test', (req, res) => {
  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true }));
  }, 1500);
});

// static files and fallback, should be after API handlers
if (process.env.DEV_SERVER != null) {
    const devReloader = require('./webpack-dev-reloader');
    devReloader.attach(app);
    app.use(express.static(path.join(__dirname, '/public')));
    app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/public/index.html')));
} else {
    app.use(express.static(path.join(__dirname, '/build')));
    app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/build/index.html')));
}

app.listen(port, function () {
  console.log('started at ' + port);
});
