/**
 * Created by KimCoding on 2016. 5. 1..
 */
'use strict';

let fs = require('fs');
let path = require('path');
const RESOURCES_PATH = path.dirname(__filename);

module.exports = function(program, prompt) {
    fs.readdirSync(RESOURCES_PATH).filter((filename) => {
        return (/\.js$/.test(filename) && filename !== 'index.js');
    }).forEach(function (filename) {
        const cmdPath = path.join(RESOURCES_PATH, filename);
        require(cmdPath)(program, prompt);
    });
};
