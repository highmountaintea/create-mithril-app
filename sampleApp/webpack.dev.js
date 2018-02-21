const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./client/index.js', 'webpack-hot-middleware/client?reload=true'],
  },
  output: {
    filename: 'static/app.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
