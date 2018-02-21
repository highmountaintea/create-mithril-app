const webpack = require('webpack');
const webpackConfig = require('./webpack.dev');
const compiler = webpack(webpackConfig);
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

function attach(app) {
    app.use(webpackMiddleware(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath,      
    }));
    app.use(webpackHotMiddleware(compiler));
}

exports.attach = attach;
