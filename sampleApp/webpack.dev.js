const path = require('path');

const babel = true;

let rules = [];
if (babel) rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  use : {
    loader: 'babel-loader',
    options: {
      presets: ['env'],
      plugins: ['transform-object-rest-spread'],
    },
  },
});


module.exports = {
  entry: {
    app: ["./client/index.js"],
  },
  output: {
    filename: "static/app.js",
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
  },
  devtool: 'source-map',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
    contentBase: 'public',
  },
  module: {
    rules: rules,
  },
};
