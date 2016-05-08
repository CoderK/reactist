'use strict';

const commandService = require('../service/command-service.js');
const logger = require('../log/logger.js');

module.exports = function test(program) {
    program
        .command('deploy')
        .description('test all unit tests and build production code.')
        .action(() => {
            commandService.deploy();
        });
};