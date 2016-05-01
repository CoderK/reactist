'use strict';

const program = require('commander');
const pkge = require('./package.json');
const inquirer = require('inquirer');
require('./src/commands')(program, inquirer);

program.version(pkge.version);
program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;

if (NO_COMMAND_SPECIFIED) {
    program.help();
}