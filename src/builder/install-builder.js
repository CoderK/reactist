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

function makeInstListAsDefault(depsMap) {
    return extractInstList(depsMap.default);
}

function makeInstListForUnitTest(depsMap) {
    return extractInstList(depsMap.test);
}

function extractInstList(depsMap) {
    return flattenDepMaps(Object.keys(depsMap).map((key) => {
        return depsMap[key];
    }));
}

function makeInstListAsFullStack(depsMap) {
    return makeInstListAsDefault(depsMap)
            .concat(makeInstListForUnitTest(depsMap));
}

module.exports = {
    generateInstallList (depsMap, options) {
        if (options && options.shouldInstallUnitTest) {
            return makeInstListAsFullStack(depsMap);
        }

        return makeInstListAsDefault(depsMap);
    }
};