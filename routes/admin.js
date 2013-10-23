var sessionRule = require('../lib/session/sessionRule');
var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/treegre?auto_reconnect=true', {
    safe: true
});
var crypto = require('crypto');
var mongodb = require('mongodb');
module.exports = function(treegre) {
    treegre.get('/admin', sessionRule.isRoot, sessionRule.loadUser, sessionRule.restrictUserToSelf, function(req, res) {
        db.collection('users').find({
            username: {
                $ne: 'root'
            }
        }).toArray(function(err, items) {
            if (err) {
                console.log(err);
                res.render('message/server-error');
            } else {
                if (items) {
                    res.render('admin/index', {
                        data: items
                    });
                } else {
                    next();
                }
            }
        });
    });
    treegre.post('/admin', sessionRule.isRoot, sessionRule.loadUser, sessionRule.restrictUserToSelf, function(req, res, next) {
        db.collection('users').find({
            username: 'root'
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
                                res.render('message/server-error');
                            } else {
                                res.render('message/root-password-updated');
                            }
                        });
                    } else {
                        res.render('message/root-invalid-password');
                    }
                } else {
                    res.render('message/server-error');
                }
            }
        });
    });
};
