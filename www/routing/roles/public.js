"use strict";

const roles = require('../Roles');
const ChildRouter = require('../ChildRouting');

module.exports = class Auth extends ChildRouter {

    constructor() {
        super('/');
    }

    registerRouting(io) {
        return {
            '/': {
                config: {
                    auth: [roles.bin.role.all],
                    view: 'pages/404.ejs',
                    inc: 'inc/general/trang-chu.ejs',
                    title: '35416257638712',
                    get: 'view',
                    post: 'view',
                    upload: [{name: 'ádsd', maxCount: 10}],
                    seo: {
                        get: {
                            title: 'title',// -> title =? trong title roter
                                           // -> title =? trong data
                            // -> title =? trong data db
                            fbPicture: 'news.picture'// 'news.title' =? trong data
                                                     // 'news.title' =? trong data db
                        },
                        post: {
                            title: 'group',//  group =? trong data
                            description: '',
                            //  group =? trong data db
                        }
                    }
                },

                methods: {
                    get: [async function (req, res) {
                        return ChildRouter.renderToView(req, res, {news: {picture: '123132'}, group: 'tokyo'});
                    }]
                },
            },
        }
    }
};
