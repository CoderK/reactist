'use strict';

const depsMap = require('../builder/deps-map.js');
const recipieBuilder = require('../builder/install-builder.js');
const projectBuilder = require('../builder/project-builder.js');

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
                projectBuilder.generateProject(
                    name,
                    answers,
                    recipieBuilder.generateInstallList(depsMap, answers)
                );
            }).catch((err) => {
                console.log(err.stack);
            })
        });
};