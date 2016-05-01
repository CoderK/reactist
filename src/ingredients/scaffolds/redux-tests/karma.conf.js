'use strict';

let webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    let reporter = ['mocha'];

    if (config.coverage) {
        webpackConfig.module.postLoaders = [{
            test: /.*^((?!-test).)*\.(js|jsx)$/,
            exclude: /(test|__tests__|test-helper|lib|node_modules)\//,
            loader: 'istanbul-instrumenter'
        }];

        reporter.push('coverage');
    }

    config.set({
        browsers: config.headless ? ['PhantomJS'] : ['Chrome'],
        frameworks: ['mocha'],
        files: [
            'test-helper/karma-test-loader.js'
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-coverage',
            'karma-mocha-reporter'
        ],
        preprocessors: {
            './test-helper/karma-test-loader.js': ['webpack', 'sourcemap']
        },
        reporters: reporter,
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage/client'
        },
        singleRun: true
    });
};