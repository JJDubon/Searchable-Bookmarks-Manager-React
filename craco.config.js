const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  webpack: {
    configure: {
      experiments: {
        topLevelAwait: true,
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: 'src/background', to: 'background' }],
      }),
    ],
  },
};
