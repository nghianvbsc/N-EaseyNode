"use strict";

const BASE_COLL = require('../../../database/intalize/BaseColl');
const {pageType} = require('../../../config/CfSeo');

let object = {
    facebook: {
        picture: String,
    }
};

pageType.forEach(itemPageType => {
    object[itemPageType] = {
        title: String,
        description: String,
        keywords: String,
        copyright: String,
    };
});

module.exports = BASE_COLL("seo", object);