const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  webpack: {
    configure: (config, { env, paths }) => {
      config.entry = {
        main: config.entry,
        background: {
          import: './src/background/index.ts',
          filename: 'background.js',
        },
      };

      config.output = {
        ...config.output,
        filename: 'static/js/[name].bundle.js',
      };

      config.experiments = {
        topLevelAwait: true,
      };

      return config;
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'src/background', to: 'background' },
          { from: 'public/*', to: '.' },
        ],
      }),
    ],
  },
};
