'use strict';

require('shelljs/global');

/*
The reason that I declared this variables with let is to see:
https://github.com/jhnns/rewire/issues/79
 */
let fs = require('fs');
let jsonfile = require('jsonfile');
const config = require('../config.js');

function createWorkingDir(name) {
    if (name) {
        mkdir(name);
        cd(name);
    }

    exec('npm init -y');
}

function installDeps(instList) {
    instList.forEach((cmd) => exec(cmd));
}

function createScaffold(config, options) {
    cp('-R', config.REDUX_SCAFFOLD_PATH, '.');

    if (options && options.shouldInstallUnitTest) {
        cp('-R', config.REDUX_SAMPLE_TEST_PATH, '.');
    }
}

function updatePackageJson(config, options) {
    let origin = jsonfile.readFileSync(config.PACKAGE_JSON_PATH);
    let updated = Object.assign({}, origin, generateScripts(config, options) );

    jsonfile.writeFileSync(config.PACKAGE_JSON_PATH, updated, { spaces: 2 });
}

function generateScripts(config, options) {
    let scripts = { scripts: require(config.REACT_NPM_SCRIPTS_PATH) };

    if (options && options.shouldInstallUnitTest) {
        scripts.scripts = Object.assign(scripts.scripts, require(config.TEST_NPM_SCRIPTS_PATH));
    }

    return scripts;
}

function updateWebpackConfig(config, options) {
    let data = require(config.WEBPACK_TEMPLATE_PATH);
    let extraSet = '';

    if (options && options.shouldInstallUnitTest) {
        extraSet = require(config.ENZYME_SETTING_PATH);
    }

    fs.writeFileSync(
        config.WEBPACK_CONFIG_PATH,
        data.replace(config.ENZYME_PLACEHOLDER, extraSet)
    );
}

module.exports = {
    createProject(name, options, instList) {
        createWorkingDir(name);
        installDeps(instList);
        createScaffold(config, options);
        updatePackageJson(config, options);
        updateWebpackConfig(config, options);
    }
};