'use strict';

require('chai').should();

const rewire = require("rewire");
const sinon = require('sinon');
const projectBuilder = rewire('../project-builder.js');
const config = require('../../config.js');

describe('project-builder', () => {
    let sandboxSinon = null;
    let reverts = [];
    let actualInstallList =  null;

    const projectName = 'blah';
    const samplePackageJson = {
        "name": "",
        "description": "",
        "version": "0.0.2",
        "main": "index.js",
        "scripts": {},
        "license": "MIT",
        "keywords": []
    };
    const installList = [
        'npm install sample1',
        'npm install sample2'
    ];

    beforeEach(() => {
        actualInstallList = [];
        setupGlobalMock();
    });

    afterEach(() => {
        actualInstallList = null;
        restoreGlobalMock();
    });

    describe('User can create project', () => {
        const ANY_OPT = {};

        it('should create directory with project name', () => {
            // given
            // when
            projectBuilder.createProject(projectName, ANY_OPT, installList);

            // then
            global.mkdir.calledWith(projectName).should.be.true;
            global.cd.calledWith(projectName).should.be.true;
        });

        it('should install npm dependencies', () => {
            // given
            // when
            projectBuilder.createProject(projectName, ANY_OPT, installList);

            // then
            actualInstallList.should.be.eql(installList);
        });

        describe('when create project with null options argument passed', () => {
            let NULL_OPT = null;

            it('should copy a redux scaffold to current directory', () => {
                // given
                // when
                projectBuilder.createProject(projectName, NULL_OPT, installList);

                // then
                global.cp.calledWith('-R', config.REDUX_SCAFFOLD_PATH, '.').should.be.true;
            });

            it('should replace scripts of current package.json with scripts of reactist build scripts', () => {
                // given
                let fStubWriteFileSync = projectBuilder.__get__('jsonfile').writeFileSync;
                let expected = getPackageJsonWithReactistScripts();

                // when
                projectBuilder.createProject(projectName, NULL_OPT, installList);

                // then
                fStubWriteFileSync.calledWith(
                    config.PACKAGE_JSON_PATH,
                    expected
                ).should.be.true;
            });

            it('should copy webpack config template to webpack.config.js in current directory', () => {
                // given
                let fStubWriteFileSync = projectBuilder.__get__('fs').writeFileSync;
                let expected = getDefaultWebpackConfig();

                // when
                projectBuilder.createProject(projectName, NULL_OPT, installList);

                // then
                fStubWriteFileSync.calledWith(
                    config.WEBPACK_CONFIG_PATH,
                    expected
                ).should.be.true;
            });
        });

        describe('when create project with houldInstallUnitTest being disabled', () => {
            let TEST_DISALED_OPT = {
                shouldInstallUnitTest: false
            };

            it('should copy a redux scaffold to current directory', () => {
                // given
                // when
                projectBuilder.createProject(projectName, TEST_DISALED_OPT, installList);

                // then
                global.cp.calledWith('-R', config.REDUX_SCAFFOLD_PATH, '.').should.be.true;
            });

            it('should replace scripts of current package.json with scripts of reactist build scripts', () => {
                // given
                let fStubWriteFileSync = projectBuilder.__get__('jsonfile').writeFileSync;
                let expected = getPackageJsonWithReactistScripts();

                // when
                projectBuilder.createProject(projectName, TEST_DISALED_OPT, installList);

                // then
                fStubWriteFileSync.calledWith(
                    config.PACKAGE_JSON_PATH,
                    expected
                ).should.be.true;
            });

            it('should copy webpack config template to webpack.config.js in current directory', () => {
                // given
                let fStubWriteFileSync = projectBuilder.__get__('fs').writeFileSync;
                let expected = getDefaultWebpackConfig();

                // when
                projectBuilder.createProject(projectName, TEST_DISALED_OPT, installList);

                // then
                fStubWriteFileSync.calledWith(
                    config.WEBPACK_CONFIG_PATH,
                    expected
                ).should.be.true;
            });
        });

        describe('when create project with shouldInstallUnitTest being enabled', () => {
            let TEST_ENABLED_OPT = {
                shouldInstallUnitTest: true
            };

            it('should copy a redux scaffold and sample test to current directory', () => {
                // given
                // when
                projectBuilder.createProject(projectName, TEST_ENABLED_OPT, installList);

                // then
                global.cp.calledWith('-R', config.REDUX_SCAFFOLD_PATH, '.').should.be.true;
                global.cp.calledWith('-R', config.REDUX_SAMPLE_TEST_PATH, '.').should.be.true;
            });

            it('should replace scripts of current package.json with reactist build scripts including test', () => {
                // given
                const fStubWriteFileSync = projectBuilder.__get__('jsonfile').writeFileSync;
                var expected = getPackageJsonWithTestScripts();

                // when
                projectBuilder.createProject(projectName, TEST_ENABLED_OPT, installList);

                // then
                fStubWriteFileSync.calledWith(config.PACKAGE_JSON_PATH, expected).should.be.true;
            });

            it('should copy webpack config template to webpack.config.js with enzyme config in current directory', () => {
                // given
                let fStubWriteFileSync = projectBuilder.__get__('fs').writeFileSync;
                let expected = getWebpackConfigWithEnzyme();

                // when
                projectBuilder.createProject(projectName, TEST_ENABLED_OPT, installList);

                // then
                fStubWriteFileSync.calledWith(config.WEBPACK_CONFIG_PATH, expected).should.be.true;
            });
        });
    });


    function getPackageJsonWithTestScripts() {
        let expected = getPackageJsonWithReactistScripts();
        expected.scripts = Object.assign(expected.scripts, require(config.TEST_NPM_SCRIPTS_PATH));
        return expected;
    }

    function getWebpackConfigWithEnzyme() {
        let expected = require(config.WEBPACK_TEMPLATE_PATH);
        expected = expected.replace(config.ENZYME_PLACEHOLDER, require(config.ENZYME_SETTING_PATH));
        return expected;
    }

    function getDefaultWebpackConfig() {
        let expected = require(config.WEBPACK_TEMPLATE_PATH);
        expected = expected.replace(config.ENZYME_PLACEHOLDER, '');
        return expected;
    }

    function getPackageJsonWithReactistScripts() {
        let expected = Object.assign({}, samplePackageJson, {
            scripts: require(config.REACT_NPM_SCRIPTS_PATH)
        });
        return expected;
    }

    function setupGlobalMock() {
        sandboxSinon = sinon.sandbox.create();
        sandboxSinon.stub(global, 'mkdir', () => {});
        sandboxSinon.stub(global, 'cp', () => {});
        sandboxSinon.stub(global, 'cd', () => {});
        sandboxSinon.stub(global, 'exec', (cmd) => {
            if (cmd.indexOf('npm install') > -1) {
                actualInstallList.push(cmd);
            }
        });

        reverts.push(
            projectBuilder.__set__('jsonfile', {
                writeFileSync: sandboxSinon.stub(),
                readFileSync() {
                    return samplePackageJson;
                }
            })
        );

        reverts.push(
            projectBuilder.__set__('fs', {
                writeFileSync: sandboxSinon.stub()
            })
        );
    }

    function restoreGlobalMock() {
        sandboxSinon.restore();
        reverts.forEach((revert) => revert());
        reverts = [];
    }
});