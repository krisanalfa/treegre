var sessionRule = require('../lib/session/sessionRule');
var mongo = require('mongoskin');
var mongodb = require('mongodb');
var db = mongo.db('localhost:27017/treegre?auto_reconnect=true', {
    safe: true
});
var crypto = require('crypto');
module.exports = function(treegre) {
    treegre.get('/users/:name', sessionRule.loadUser, sessionRule.restrictUserToSelf, function(req, res, next) {
        var username = req.params.name;
        db.collection('users').find({
            'username': username
        }).toArray(function(err, items) {
            if (err) {
                console.log(err);
                res.render('message/server-error');
            } else {
                if (items[0]) {
                    res.render('users/index', {
                        user: items[0]
                    });
                } else {
                    next();
                }
            }
        });
    });
    treegre.get('/settings/:name', sessionRule.loadUser, sessionRule.restrictUserToSelf, function(req, res, next) {
        var username = req.params.name;
        db.collection('users').find({
            'username': username
        }).toArray(function(err, items) {
            if (err) {
                console.log(err);
                res.render('message/server-error');
            } else {
                if (items[0]) {
                    res.render('users/settings', {
                        user: items[0]
                    });
                } else {
                    next();
                }
            }
        });
    });
    treegre.get('/profile/:name', sessionRule.loadUser, sessionRule.restrictUserToSelf, function(req, res, next) {
        var username = req.params.name;
        db.collection('users').find({
            'username': username
        }).toArray(function(err, items) {
            if (err) {
                console.log(err);
                res.render('message/server-error');
            } else {
                if (items[0]) {
                    res.render('users/profile', {
                        user: items[0]
                    });
                } else {
                    next();
                }
            }
        });
    });
    treegre.post('/update/:name', sessionRule.loadUser, sessionRule.restrictUserToSelf, function(req, res, next) {
        var _id = req.body._id;
        delete req.body._id;
        db.collection('users').update({
            "_id": new mongodb.BSONPure.ObjectID(_id)
        }, {
            $set: req.body
        }, {
            safe: true
        }, function(err) {
            if (err) {
                console.log(err);
                res.render('message/server-error');
            } else {
                res.render('message/user-updated');
            }
        });
    });
    treegre.post('/change-password/:name', sessionRule.loadUser, sessionRule.restrictUserToSelf, function(req, res, next) {
        var username = req.session.user.username;
        db.collection('users').find({
            'username': username
        }).toArray(function(err, items) {
            if (err) {
                console.log(err);
                res.render('message/server-error');
            } else {
                if (typeof items != "undefined") {
                    var oldPassword = crypto.createHash('md5').update(req.body.old).digest('hex');
                    var data = {};
                    if (items[0].password == oldPassword) {
                        data = {
                            "password": crypto.createHash('md5').update(req.body.new).digest('hex')
                        };
                        var _id = items[0]._id.toString().replace(/\"/g, '');
                        db.collection('users').update({
                            "_id": new mongodb.BSONPure.ObjectID(_id)
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
                    } else {
                        res.render('message/user-invalid-password');
                    }
                } else {
                    res.render('message/server-error');
                }
            }
        });
    });
};
