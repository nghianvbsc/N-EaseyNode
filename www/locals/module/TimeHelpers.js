"use strict";

const timeUtils = require('../../utils/TimeUtils');

module.exports = function (app) {
    app.locals.convertDateShow1 = function (date) {
        return timeUtils.parseTimeFormat4(date);
    };

    app.locals.convertDateShow2 = function (date) {
        return timeUtils.parseTimeFormat5(date);
    };
    app.locals.convertDateShow3 = function(date,format){
        return timeUtils.parseTimeFormatOption(date,format);
    }
};