"use strict";

const promise = require('bluebird');
const stringUtils = require('../utils/StringUtils');
const utils = require('../utils/utils');
const BaseModel = require('./intalize/BaseModel');

class Model extends BaseModel {

    constructor() {
        super(require('../database/UserCol'))
    }

    registerUser(obj) {
        const that = this;
        return new promise(async resolve => {
            obj.email = obj.email.toString().toLowerCase().trim();
            let countEmail = await that.countDataWhere({email: obj.email});
            let countPhone = await that.countDataWhere({phone: obj.phone});
            if (countEmail > 0) {
                return resolve({error: true, message: 'Email đã tồn tại!'})
            }
            if (countPhone > 0) {
                return resolve({error: true, message: 'Số điện thoại đã tồn tại!'})
            }
            let user = await that.insertData(obj);
            return resolve(user);
        })
    }

    signinAccount(email, password) {
        const that = this;
        return new promise(async resolve => {
            email = email.toString().toLowerCase().trim();
            let countUserName = await that.countDataWhere({email: email});
            if (countUserName === 0) return resolve({error: true, message: "Tài khoản không tồn tại!"});
            let user = await that.getDataWhere({
                email: email,
                password: stringUtils.md5(password)
            }, that.FIND_ONE());
            if (utils.isEmptyObject(user)) return resolve({error: true, message: "Mật khẩu không đúng"});
            return resolve({error: false, user});
        })

    }

    getUsersById(id) {
        const that = this;
        return new promise(async resolve => {
            let user = await that.getDataById(id);
            return resolve(user);
        })
    }

    getAllUsersForStatus(status) {
        const that = this;
        return new promise(async resolve => {
            let user = await that.getDataWhere({userType: 1, status}, that.FIND_MANY(), {createAt: -1});
            return resolve(user);
        })
    }

    getAllUsersNotActive() {
        const that = this;
        return new promise(async resolve => {
            let user = await that.getDataWhere({userType: 1, isActive: 0}, that.FIND_MANY(), {createAt: -1});
            return resolve(user);
        })
    }

    getUserByEmail(email) {
        const that = this;
        return new promise(async resolve => {
            email = email.toString().toLowerCase().trim();
            let user = await that.getDataWhere({email: email}, that.FIND_ONE());
            return resolve(user);
        })
    }

    updateUser(id, con) {
        const that = this;
        return new promise(async resolve => {
            await that.updateById(id, con);
            return resolve();
        })
    }

    updateUpMoneyUser(id, money) {
        const that = this;
        return new promise(async resolve => {
            await that.updateById(id, {$inc: {money: money}});
            return resolve();
        })
    }

    updateDownMoneyUser(id, money) {
        const that = this;
        return new promise(async resolve => {
            await that.updateById(id, {$inc: {money: -money}});
            return resolve();
        })
    }

    lockUser(id) {
        const that = this;
        return new promise(async resolve => {
            await that.updateById(id, {status: 1});
            return resolve();
        })
    }

    unlockUser(id) {
        const that = this;
        return new promise(async resolve => {
            await that.updateById(id, {status: 0});
            return resolve();
        })
    }

    deleteUser(id) {
        const that = this;
        return new promise(async resolve => {
            await that.removeDataById(id);
            return resolve();
        })
    }

    addNotification(userId, io) {
        const that = this;
        return new promise(async resolve => {
            let user = await that.getDataById(userId);
            let notify = user.notifications;
            notify.notification = Number(notify.notification) + 1;
            await that.updateById(userId, {
                notifications: notify
            });
            io.emit(userId, {type: 'new-notification'});
            return resolve();
        });
    }

    resetNotification(userId) {
        const that = this;
        return new promise(async resolve => {
            let user = await that.getDataById(userId);
            let notify = user.notifications;
            notify.notification = 0
            await that.updateById(userId, {notifications: notify});
            return resolve();
        });
    }

    countUserActive() {
        const that = this;
        return new promise(async resolve => {
            return resolve(await that.countDataWhere({status: 0, userType: 1}));
        });
    }

    countUserBlock() {
        const that = this;
        return new promise(async resolve => {
            return resolve(await that.countDataWhere({status: 1, userType: 1}));
        });
    }
}

exports.MODEL = new Model();