'use strict';

module.exports = {
    default: {
        react: [
            'npm install --save --progress=false react',
            'npm install --save-dev --progress=false webpack webpack-dev-server',
            'npm install --save-dev --progress=false babel babel-cli babel-polyfill babel-loader babel-preset-react babel-preset-es2015 babel-preset-airbnb'
        ],
        client: [
            'npm install --save --progress=false react-dom'
        ],
        redux: [
            'npm install --save --progress=false redux react-redux',
            'npm install --save-dev --progress=false redux-devtools'
        ]
    },
    test: {
        reactTestUtils: [
            'npm install --save-dev --progress=false react-addons-test-utils'
        ],
        mocha: [
            'npm install --save-dev --progress=false mocha',
            'npm install --save-dev --progress=false chai'
        ],
        karma: [
            'npm install --save-dev --progress=false karma karma-cli karma-webpack karma-sourcemap-loader karma-chrome-launcher karma-mocha karma-mocha-reporter karma-chai',
            'npm install --save-dev --progress=false phantomjs-prebuilt karma-phantomjs-launcher karma-coverage istanbul-instrumenter-loader'
        ],
        enzyme: [
            'npm install --save-dev --progress=false enzyme'
        ]
    }
};