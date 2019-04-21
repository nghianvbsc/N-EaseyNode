"use strict";

const utils = require('./utils');

exports.priceFormat = function (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
};

exports.baseFormatNumber = function (number, fixLength) {
    return utils.currencyFormat(number, fixLength);
};

exports.randomStartEnd = function (start, end) {
    return Math.floor((Math.random() * end) + start);

};