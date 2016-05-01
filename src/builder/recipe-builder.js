'use strict';

function flattenDepMaps (depMaps) {
    return depMaps.map((deps) => {
        if (Array.isArray(deps)) {
            return deps;
        } else {
            return Object.keys(deps).map((key) => deps[key]);
        }
    }).reduce(function (a, b) {
        return a.concat(b);
    });
}

function makeDefaultDeps(depsMap) {
    return [
        depsMap.react,
        depsMap.client,
        depsMap.redux
    ];
}

function makeDepsForTest(depsMap) {
    return [
        depsMap.reactTestUtils,
        depsMap.mocha,
        depsMap.karma,
        depsMap.enzyme
    ];
}

module.exports = {
    genDepsRecipe (depsMap, answers) {
        let deps = makeDefaultDeps(depsMap);

        if (answers.shouldInstallUnitTest) {
            deps = deps.concat(makeDepsForTest(depsMap.test));
        }

        return flattenDepMaps(deps);
    }
};