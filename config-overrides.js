const webpack = require('webpack');
const { resolve } = require('path');
const os = require('os');

process.env.SASS_PATH = resolve(__dirname, 'node_modules') + (os.platform === 'win32' ? ';' : ':') + resolve(__dirname, 'src', 'styles')
process.env.GENERATE_SOURCEMAP = false

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false
      }
    })
    config.resolve.fallback = {
      url: require.resolve('url'),
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      process: require.resolve('process'),
      history: require.resolve('history'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
      fs: false,
      path: false,
      child_process: false,
      "readable-stream": false
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    );
    config.experiments = {
      asyncWebAssembly: true,
    };

    config.ignoreWarnings = (config.ignoreWarnings || []).concat([/Failed to parse source map/]);
    
    if (process.env.NODE_ENV === 'production') {
      config.optimization.runtimeChunk = false;
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 500000,
        maxSize: 8000000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};
