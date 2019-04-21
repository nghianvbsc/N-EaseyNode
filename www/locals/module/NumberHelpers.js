"use strict";

const utils = require('../../utils/utils');

module.exports = function (app) {
    app.locals.priceFormat = function (num) {
        return utils.currencyFormat(num, 0);
    };

    app.locals.baseFormatNumber = function (number, fixLength) {
        return utils.currencyFormat(number, fixLength);
    };
};