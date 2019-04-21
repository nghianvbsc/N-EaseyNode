"use strict";

const BASE_COLL = require('./intalize/BaseColl');
module.exports = BASE_COLL("users", {
    fullName: String,
});