var mongo   = require('mongoskin');
var db      = mongo.db('localhost:27017/treegre?auto_reconnect=true', {safe:true});

exports.isRoot = function(req, res, next) {
    if (! req.session.user || req.session.user.username !== 'root') {
        res.redirect('/');
    } else {
        next();
    }
};

exports.loadUser = function(req, res, next) {
    var params = '';
    if (typeof req.params.name == "undefined") {
        params = req.session.user.username;
    } else {
        params = req.params.name;
    }

    db.collection('users').find({'username' : params}).toArray(function(err, items) {
        var user = req.user = items[0];
        if (!user) {
            res.render('message/user-not-found');
        } else {
            next();
        }
    });
};

exports.notLoggedIn = function(req, res, next) {
    if (req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
};

exports.restrictUserToSelf = function(req, res, next) {
    if (! req.session.user || req.session.user.username !== req.user.username) {
        res.redirect('/');
    } else {
        next();
    }
};
