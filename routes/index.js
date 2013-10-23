var mongo = require('mongoskin');
var generate = require('../lib/helper/generate');
var router = require('../lib/helper/router');
var mailer = require('../lib/mailer/mailer');
var crypto = require('crypto');
var mongodb = require('mongodb');
var db = mongo.db('localhost:27017/treegre?auto_reconnect=true', {
    safe: true
});
var simple_recaptcha = require('simple-recaptcha');
module.exports = function(treegre) {
    treegre.get('/', function(req, res) {
        if (req.session.user) {
            var goTo = router.userRoute(req.session.user.username);
            res.redirect(goTo);
        } else {
            res.render('index');
        }
    });
    treegre.get('/register', function(req, res) {
        if (req.session.user) {
            var goTo = router.userRoute(req.session.user.username);
            res.redirect(goTo);
        } else {
            res.render('register');
        }
    });
    treegre.post('/register', function(req, res) {
        var date = generate.getDate();
        var ip = req.connection.remoteAddress;
        var access = {
            ip: ip,
            last_register: date
        };
        var auth = {
            id: generate.createID(),
            email: req.body.email
        };
        var code = auth.id;

        function createSession() {
            req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
            req.session.guest = {
                ip: ip,
                last_register: date
            };
        }

        function createAccess() {
            db.collection('access').insert(access, function(err, items) {
                if (typeof err != 'undefined') {
                    console.log(err);
                    res.render('message/server-error');
                } else {
                    console.log("Access has been written for " + ip);
                }
            });
        }

        function updateSession() {
            req.session.destroy();
            createSession();
        }

        function createAuth() {
            db.collection('auth').insert(auth, function(err, items) {
                if (err) {
                    console.log(err);
                    res.render('message/server-error');
                } else {
                    console.log("Auth has been saved for " + auth.email);
                }
            });
        }

        function register() {
            var data = {
                ip: ip,
                last_register: date
            };

            function callback() {
                if (typeof error != 'undefined') {
                    res.render('message/mailing-error');
                } else {
                    res.render('message/user-created');
                }
            }
            db.collection('users').find({
                "$or": [{
                    username: req.body.username
                }, {
                    email: req.body.email
                }]
            }).toArray(function(err, items) {
                if (err) {
                    console.log(err);
                    res.render('message/server-error');
                } else {
                    if (items[0]) {
                        res.render('message/taken');
                    } else {
                        delete req.body.verPassword;
                        delete req.body.recaptcha_challenge_field;
                        delete req.body.recaptcha_response_field;
                        req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
                        db.collection('tmp').insert(req.body, function(err, items) {
                            if (err) {
                                console.log(err);
                                res.render('message/server-error');
                            } else {
                                var to = "'" + req.body.name + "'" + " " + "<" + req.body.email + ">";
                                var host = "";
                                // host -> http://localhost:8000
                                var message = "<a href=" + "'" + host + "/verify/" + code + "'" + ">Verify you email by click here</a>";
                                var subject = 'Please verify your email address';
                                createAuth();
                                createSession();
                                mailer.sendEmail(to, subject, message, callback);
                            }
                        });
                    }
                }
            });
        }
        ip = req.connection.remoteAddress;
        var privateKey = '';
        var challenge = req.body.recaptcha_challenge_field;
        var response = req.body.recaptcha_response_field;
        simple_recaptcha(privateKey, ip, challenge, response, function(err) {
            if (err) {
                console.log(err);
                res.render('message/wrong-captcha');
            } else {
                if (typeof req.session.guest == 'undefined') {
                    register();
                } else {
                    if (req.session.guest.ip == ip) {
                        var criteria = generate.getDate();
                        var last_access = req.session.guest.last_register;
                        criteria = criteria.split(' ')[0];
                        last_access = last_access.split(' ')[0];
                        if (criteria == last_access) {
                            res.render('message/a-day-later');
                        } else {
                            updateSession();
                            register();
                        }
                    } else {
                        createSession();
                        register();
                    }
                }
            }
        });
    });
    treegre.get('/verify/:code', function(req, res) {
        var params = generate.getLastSegmentUrl(req.originalUrl);
        db.collection('auth').find({
            id: params
        }).toArray(function(err, items) {
            if (items[0]) {
                var email = items[0].email;
                db.collection('tmp').find({
                    email: email
                }).toArray(function(err, items) {
                    if (items[0]) {
                        delete items[0]._id;
                        db.collection('users').insert(items[0], function(err, items) {
                            if (err) {
                                console.log(err);
                                res.render('message/server-error');
                            } else {
                                db.collection('tmp').remove({
                                    email: email
                                }, function(err, items) {
                                    if (err) {
                                        console.log(err);
                                        res.render('message/server-error');
                                    } else {
                                        db.collection('auth').remove({
                                            id: params
                                        }, function(err, items) {
                                            if (err) {
                                                console.log(err);
                                                res.render('message/server-error');
                                            } else {
                                                res.render('message/email-verified');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        res.render('message/cannot-verify');
                    }
                });
            } else {
                res.render('message/cannot-verify');
            }
        });
    });
    treegre.get('/forgot', function(req, res) {
        if (req.session.user) {
            var goTo = router.userRoute(req.session.user.username);
            res.redirect(goTo);
        } else {
            res.render('forgot-password');
        }
    });
    treegre.post('/forgot', function(req, res) {
        var code = generate.createID();
        var privateKey = '';
        var ip = req.connection.remoteAddress;
        var challenge = req.body.recaptcha_challenge_field;
        var response = req.body.recaptcha_response_field;

        function callback() {
            if (typeof error != 'undefined') {
                res.render('message/mailing-error');
            } else {
                res.render('message/email-sent');
            }
        }

        function createReset() {
            var data = {
                code: code,
                email: req.body.email
            };
            db.collection('reset').remove({
                email: req.body.email
            }, function(err, items) {
                if (err) {
                    console.log(err);
                    res.render('message/server-error');
                } else {
                    db.collection('reset').insert(data, function(err, items) {
                        if (err) {
                            console.log(err);
                            res.render('message/server-error');
                        } else {
                            console.log("Reset schema has been saved for " + data.email);
                        }
                    });
                }
            });
        }
        simple_recaptcha(privateKey, ip, challenge, response, function(err) {
            if (err) {
                console.log(err);
                res.render('message/wrong-captcha-forgot');
            } else {
                delete req.body.recaptcha_challenge_field;
                delete req.body.recaptcha_response_field;
                db.collection('users').find({
                    email: req.body.email
                }).toArray(function(err, items) {
                    if (err) {
                        console.log(err);
                        res.render('message/server-error');
                    } else {
                        if (items[0]) {
                            createReset();
                            var to = "'" + items[0].name + "'" + " " + "<" + req.body.email + ">";
                            var subject = 'You have been requested a reset password schema.';
                            var host = "";
                            // host -> http://localhost:8000
                            var message = "<a href=" + "'" + host + "/reset/" + code + "'" + ">Reset your password by click here</a>";
                            mailer.sendEmail(to, subject, message, callback);
                        } else {
                            res.render('message/email-not-found');
                        }
                    }
                });
            }
        });
    });
    treegre.get('/reset/:code', function(req, res) {
        var params = generate.getLastSegmentUrl(req.originalUrl);
        db.collection('reset').find({
            code: params
        }).toArray(function(err, items) {
            if (err) {
                console.log(err);
                res.render('message/server-error');
            } else {
                if (items[0]) {
                    res.render('reset-password');
                } else {
                    res.render('message/cannot-verify');
                }
            }
        });
    });
    treegre.post('/resetpassword', function(req, res) {
        db.collection('reset').find({
            email: req.body.email
        }).toArray(function(err, items) {
            if (err) {
                console.log(err);
                res.render('message/server-error');
            } else {
                if (items[0]) {
                    var data = {
                        password: crypto.createHash('md5').update(req.body.password).digest('hex')
                    };
                    db.collection('reset').remove({
                        email: req.body.email
                    }, function(err, items) {
                        if (err) {
                            console.log(err);
                            res.render('message/server-error');
                        } else {
                            db.collection('users').update({
                                email: req.body.email
                            }, {
                                $set: data
                            }, {
                                safe: true
                            }, function(err) {
                                if (err) {
                                    console.log(err);
                                    res.render('message/server-error');
                                } else {
                                    res.render('message/user-password-updated');
                                }
                            });
                        }
                    });
                } else {
                    res.render('message/email-mismatch');
                }
            }
        });
    });
};
