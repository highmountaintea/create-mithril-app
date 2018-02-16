const path = require('path');

module.exports = {
  entry: {
    app: ["./client/index.js"],
  },
  output: {
    filename: "static/app.js",
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
    contentBase: 'public',
  },
};
