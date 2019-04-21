"use strict";

const promise = require('bluebird');
const utils = require('../../../utils/utils');
const {pageType} = require('../../../config/CfSeo');
const {CfApp} = require('../../../config/CfApp');
const BaseModel = require('../../../models/intalize/BaseModel');

class Model extends BaseModel {

    constructor() {
        super(require('../database/SeoSettingCol'))
    }

    getSetting() {
        const that = this;
        return new promise(async resolve => {
            let setting = await that.getDataWhere({}, that.FIND_ONE());
            if (utils.isEmptyObject(setting)) {
                let rsl = {};
                pageType.forEach(itemPageType => {
                    rsl[itemPageType] = {
                        title: CfApp.webName,
                        description: CfApp.webName,
                        keywords: CfApp.webName,
                        copyright: CfApp.webName,
                    };
                });
                rsl['facebook'] = {
                    picture: ''
                };

                return resolve(rsl)
            } else {
                return resolve(setting);
            }
        })
    }

    updateSetting(data) {
        const that = this;
        return new promise(async resolve => {
            let count = await that.countDataWhere({});
            if (count === 0) {
                if (!data.facebook) {
                    data.facebook = {
                        picture: '',
                    };
                } else {
                    pageType.forEach(itemPageType => {
                        data[itemPageType] = {
                            title: CfApp.webName,
                            description: CfApp.webName,
                            keywords: CfApp.webName,
                            copyright: CfApp.webName,
                        };
                    });
                }
                await that.insertData(data);
            } else {
                await that.updateWhereClause({}, data);
            }
            return resolve();
        })
    }
}

exports.MODEL = new Model();