'use strict';

const commandService = require('../service/command-service.js');
const logger = require('../log/logger.js');

module.exports = function test(program) {
    program
        .command('build')
        .description('transpile and bundle all sources with webpack.')
        .action(() => {
            commandService.build();
        });
};