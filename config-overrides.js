const webpack = require('webpack');

module.exports = function override(config, env) {
    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      })
  config.resolve.fallback = {
    // url: require.resolve('url'),
    // // assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    // process: require.resolve('process'),
    // history: require.resolve('history'),
    // os: require.resolve('os-browserify/browser'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify'),
    fs: false,
    // path: false,
    // child_process: false,
    // "readable-stream": false
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      // process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  );

  config.experiments = {
    asyncWebAssembly: true,
  }

  config.ignoreWarnings = [/Failed to parse source map/]

  return config;
}