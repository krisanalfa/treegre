exports.sendEmail = function(to, subject, message, callback) {
    var nodemailer = require("nodemailer");

    var transport = nodemailer.createTransport("SMTP", {
        service: 'Gmail',
        auth: {
            XOAuthToken: nodemailer.createXOAuthGenerator({
                user: "",
                token: "",
                tokenSecret: ""
            })
        },
        debug: true
    });

    var msg = {
        from: 'Your Name <yourname@somedomain.com>',
        to: to,
        subject: subject,
        headers: {
            'X-Laziness-level': 1000
        },
        html: message
    };

    transport.sendMail(msg, function(error) {
        if(error) { error = this.error; return false; }
        callback();
        transport.close();
    });
};
