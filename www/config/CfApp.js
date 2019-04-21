"use strict";

const hostProduct = require('./CfMode').hostProduct;
const databaseProduct = require('./CfMode').databaseProduct;
let config = {
    protocol: 'http',
    domainRelease: '',
    webName: '',

    hostProduct: '66.42.36.219',
    portProduct: '80',

    hostDev: 'localhost',
    portDev: '5000',

    dbProduct: {
        name: 'mytokyo',
        user: 'mytokyo',
        password: 'mytokyo512783',
        host: '66.42.36.219',
        port: '27017'
    },

    dbDev: {
        name: 'mytokyo',
        user: 'mytokyo',
        password: 'mytokyo1',
        host: '42.112.38.190',
        port: '27017'
    },

};


config.host = (!hostProduct) ? config.hostDev : config.hostProduct;
config.port = (!hostProduct) ? config.portDev : config.portProduct;
config.domain = (!hostProduct) ? 'http://' + config.hostDev + ':' + config.portDev : protocol + "://" + config.domainRelease;
config.db = databaseProduct ? config.dbProduct : config.dbDev;

module.exports = config;