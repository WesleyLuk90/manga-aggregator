const webpackConfig = require('./webpack.config');

webpackConfig.plugins = [];

module.exports = function configure(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'spec/browser/index.js',
        ],
        exclude: [],

        preprocessors: {
            'spec/browser/index.js': ['webpack'],
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only',
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
    });
};
