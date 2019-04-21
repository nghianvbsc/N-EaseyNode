"use strict";

const stringUtils = require('../../utils/StringUtils');

module.exports = function (app) {

    app.locals.randomString = function () {
        return `${stringUtils.randomStringFixLengthOnlyAlphabet(5)}`;
    };
    app.locals.slugLink = function (str) {
        return `${stringUtils.slugLink(str)}`
    }
};