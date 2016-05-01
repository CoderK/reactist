'use strict';

require('shelljs/global');

const fs = require('fs');
const jsonfile = require('jsonfile');
const config = require('../config.js');

module.exports = {

    generateProject(name, options, instCommands) {
        this._sayHello();
        this._createWorkingDir(name);
        this._installDeps(instCommands);
        this._createScaffold(options);
        this._updatePackageJson(options);
        this._updateWebPackConfig(options);
        this._sayGoodbye();
    },

    _createWorkingDir(name) {
        if (name) {
            mkdir(name);
            cd(name);
        }

        exec('npm init -y');
    },

    _installDeps(instCommands) {
        instCommands.forEach((cmd) => exec(cmd));
        return this;
    },

    _createScaffold(options) {
        cp('-R', config.REDUX_SCAFFOLD_PATH, '.');

        if (options.shouldInstallUnitTest) {
            cp('-R', config.REDUX_SAMPLE_TEST_PATH, '.');
        }
    },

    _updatePackageJson(options) {
        let origin = jsonfile.readFileSync(config.PACKAGE_JSON_PATH);
        let updated = Object.assign({}, origin, this.generateScripts(options) );

        jsonfile.writeFileSync(config.PACKAGE_JSON_PATH, updated, { spaces: 2 });
    },

    generateScripts(options) {
        let scripts = { scripts: require(config.REACT_NPM_SCRIPTS_PATH) };

        if (options.shouldInstallUnitTest) {
            scripts.scripts = Object.assign(scripts.scripts, require(config.TEST_NPM_SCRIPTS_PATH));
        }

        return scripts;
    },

    _updateWebPackConfig(options) {
        let data = require(config.WEBPACK_TEMPLATE_PATH);
        let extraSet = '';

        if (options.shouldInstallUnitTest) {
            extraSet = require(config.ENZYME_SETTING_PATH);
        }

        fs.writeFileSync(
            config.WEBPACK_CONFIG_PATH,
            data.replace(config.ENZYME_PLACEHOLDER, extraSet)
        );
    },

    _sayHello() {
        console.log('.');
        console.log('.');
        console.log('.');
        console.log("Let's be a reactist...!");
        console.log('Please wait for a second.');
        console.log('.');
        console.log('.');
        console.log('.');
    },

    _sayGoodbye() {
        console.log('.');
        console.log('.');
        console.log('.');
        console.log(`It has been finished, enjoy your react...!!`);
    }
};