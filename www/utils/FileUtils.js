"use strict";

const fs = require('fs');
const mkdirp = require('mkdirp');

exports.checkAndCreateFolder = function (path, done) {
    mkdirp(path, function (err) {
        done();
    });
};

exports.deleteFile = function (path) {
    fs.exists(path, function (exists) {
        if (exists) {
            fs.unlink(path, (err)=>{
                if(err) console.log(err);
                console.log('exist');
                
            });
        }
    });
};

exports.updatePath = function (path) {
    return path.split('\\').join("/");
};