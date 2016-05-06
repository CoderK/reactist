'use strict';

const depsMap = require('../core/deps-map.js');
const recipieBuilder = require('../core/install-builder.js');
const projectBuilder = require('../core/project-builder.js');
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
                projectBuilder.createProject(
                    name,
                    answers,
                    recipieBuilder.generateInstallList(depsMap, answers)
                );
                logger.sayGoodbye();
            }).catch((err) => {
                logger.printError(err.stack);
            });
        });
};