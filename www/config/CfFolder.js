"use strict";

const mainApp = require('../../app');
const minify = require('express-minify');
const fs = require('fs');

module.exports = function (app) {
    app.use(minify());

    app.use('/template/', mainApp.EXPRESS.static(mainApp.BASE_DIR + '/template/'));
    app.use('/views/', mainApp.EXPRESS.static(mainApp.BASE_DIR + '/views/'));
    app.use('/share-image/', mainApp.EXPRESS.static(mainApp.BASE_DIR + '/share-image/'));
    app.use('/language/', mainApp.EXPRESS.static(mainApp.BASE_DIR + '/language/'));
    app.use('/notify/', mainApp.EXPRESS.static(mainApp.BASE_DIR + '/notify/'));
    app.use('/files/', mainApp.EXPRESS.static(mainApp.BASE_DIR + '/files/'));
    app.use('/.well-known/', mainApp.EXPRESS.static(mainApp.BASE_DIR + '/.well-known/'));
    fs.readdir('./www/modules', (err, files1) => {
        files1.forEach(file1 => {
            if (file1 != 'seo' && file1 != 'example' && file1 != 'search' && file1 != 'language') {
                app.use(`/www/modules/${file1}/template/`, mainApp.EXPRESS.static(mainApp.BASE_DIR + `/template/${file1}`));
            }
        });
    });
};