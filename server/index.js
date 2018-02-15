const express = require('express');

let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

let app = express();

if (process.env.NODE_ENV !== 'development') {
  // add extra config into webpackConfig before using it in dev mode
  const webpack = require('webpack');
  const middleware = require('webpack-dev-middleware');
  const webpackconfig = require('../webpack.config');
  // webpackconfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  webpackconfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackconfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
  webpackconfig.entry.app.push('webpack-hot-middleware/client?reload=true');
  const compiler = webpack(webpackconfig);

  app.use(middleware(compiler, {
    noInfo: true, publicPath: webpackconfig.output.publicPath,
  }));

  app.use(require("webpack-hot-middleware")(compiler));
  app.use(express.static('./public'));
} else {
  app.use(express.static('./build'));
}

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
