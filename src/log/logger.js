'use strict';

module.exports = {
    sayHello() {
        console.log('.');
        console.log('.');
        console.log('.');
        console.log("Let's be a reactist...!");
        console.log('Please wait for a second.');
        console.log('.');
        console.log('.');
        console.log('.');
    },

    sayGoodbye() {
        console.log('.');
        console.log('.');
        console.log('.');
        console.log(`It has been finished, enjoy your react...!!`);
    },

    printError(err) {
        console.log(err.stack);
    }
};