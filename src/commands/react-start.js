'use strict';

const commandService = require('../service/command-service.js');
const logger = require('../log/logger.js');

module.exports = function test(program) {
    program
        .command('start')
        .description('run webpack-dev-server on watch mode')
        .action(() => {
            commandService.start();
        });
};