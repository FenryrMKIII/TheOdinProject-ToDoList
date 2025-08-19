const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

isLocalDev = true;

if (isLocalDev) {
  module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      hot: true, //turns on hot module reloading capability so when we change src it reloads the module we changed, thus causing a react rerender!
      port: 8080,
      open: false,
      client: {
        progress: true,
        overlay: true,
        logging: 'info' //give us all info logged to client when in local dev mode
      },
      static: './dist'
    }
  });
}