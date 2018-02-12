module.exports = {
  entry: {
    [`app.js`]: ["./client/index.js"],
  },
  output: {
    filename: "temp/static/[name]",
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
};
