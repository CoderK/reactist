'use strict';

const depsMap = require('../deps/deps-map.js');
const installBuilder = require('../deps/install-list-generator.js');
const projectService = require('../service/project-service.js');
const logger = require('../log/logger.js');

module.exports = function init(program, inquirer) {
    program
        .command('init [app-name]')
        .description('create react application with interactive.')
        .action((name) => {
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'shouldInstallUnitTest',
                    message: 'Will you write unit tests?'
                }
            ]).then((answers) => {
                logger.sayHello();
                projectService.createProject(
                    name,
                    answers,
                    installBuilder.generateInstallList(depsMap, answers)
                );
                logger.sayGoodbye();
            }).catch((err) => {
                logger.printError(err.stack);
            });
        });
};