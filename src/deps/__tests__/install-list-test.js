'use strict';

require('chai').should();

const depsMap = require('../deps-map.js');
const recipeBuilder = require('../install-list-generator.js');

describe('install-builder', () => {
    describe('when the user request to generate install list', () => {
        it('should return default install list.', () => {
            // given
            let expectedList = makeInstListAsDefault(depsMap);

            // when
            let actualList = recipeBuilder.generateInstallList(depsMap);

            // then
            actualList.should.be.eql(expectedList);
        });

        describe('and want to a unit test environment to be installed', () => {
            it('should return install list including list for unit test tools.', () => {
                // given
                let options = { shouldInstallUnitTest: true };
                let expectedList = makeInstListAsDefault(depsMap).concat(makeInstListForUnitTest(depsMap));

                // when
                let actualList = recipeBuilder.generateInstallList(depsMap, options);

                // then
                actualList.should.be.eql(expectedList);
            });
        });

        describe('and want to a unit test environment not to be installed', () => {
            it('should return default install list.', () => {
                // given
                let options = { shouldInstallUnitTest: false };
                let expectedList = makeInstListAsDefault(depsMap);

                // when
                let actualList = recipeBuilder.generateInstallList(depsMap, options);

                // then
                actualList.should.be.eql(expectedList);
            });
        });
    });



    function makeInstListForUnitTest(depsMap) {
        const testMap = depsMap.test;
        return testMap.reactTestUtils
            .concat(testMap.mocha)
            .concat(testMap.karma)
            .concat(testMap.enzyme);
    }

    function makeInstListAsDefault(depsMap) {
        const defaultMap = depsMap.default;
        return defaultMap.react
            .concat(defaultMap.client)
            .concat(defaultMap.redux);
    }
});