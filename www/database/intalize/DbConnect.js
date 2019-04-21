"use strict";

let mongoose = require('mongoose');
const databaseConfig = require('../../config/CfApp');

const mongodUrl = databaseConfig.user === '' ? 'mongodb://' + databaseConfig.host + ':' + databaseConfig.port + '/' + databaseConfig.name :
    'mongodb://' + databaseConfig.user + ':' + databaseConfig.password + '@' + databaseConfig.host + ':' + databaseConfig.port + '/' + databaseConfig.name;

mongoose = mongoose.createConnection(mongodUrl);

module.exports = mongoose;