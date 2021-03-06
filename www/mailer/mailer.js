"use strict";

let mailer = require("nodemailer");
let cfMailer = require('../config/CfMailer');

module.exports = function (to, subject, content, callback) {
    let smtpTransport = mailer.createTransport("SMTP", {
        service: cfMailer.service,
        auth: {
            user: cfMailer.email,
            pass: cfMailer.password,
        }
    });

    let mail = {
        from: 'S TRAVEL',
        to: to,
        subject: subject,
        html: content
    };

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log("error", error);
            if (callback == null || typeof callback == "undefined") {
            } else {
                callback({error: true, message: "send mail error!"});
            }
        } else {
            if (callback == null || typeof callback == "undefined") {
            } else {
                callback({error: false, message: "send mail success!"});
            }
        }

        smtpTransport.close();
    });
};