const path = require('path');
const uglifyPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

// toggle the following 3 config settings to customize build
const babel = true;
const minify = true;
const createMap = false;

let loaders = [];
if (babel) loaders.push({
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: ['env'],
  },
});

let plugins = [];
if (minify) plugins.push(new uglifyPlugin({ minimize: true }));

let devtools = undefined;
if (createMap) devtools = 'source-map';


module.exports = {
  entry: {
    app: ["./client/index.js"],
  },
  output: {
    filename: "static/app.js",
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
  },
  devtool: devtools,
  plugins: plugins,
  module: {
    loaders: loaders,
  },
};
