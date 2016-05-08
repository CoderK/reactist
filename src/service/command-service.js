'use strict';

const shell = require('shelljs');

module.exports = {
    runUnitTests() {
        shell.exec('npm run test');
    },
    build() {
        shell.exec('npm run build');
    },
    deploy() {
        shell.exec('npm run deploy');
    },
    start() {
        shell.exec('npm run start');
    }
};