'use strict';

const commandService = require('../service/command-service.js');
const logger = require('../log/logger.js');

module.exports = function test(program) {
    program
        .command('test')
        .description('run all unit tests.')
        .action(() => {
            commandService.runUnitTests();
        });
};