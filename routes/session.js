var sessionRule = require('../lib/session/sessionRule');
var mongo = require('mongoskin');
var crypto = require('crypto');
var router = require('../lib/helper/router');
var db = mongo.db('localhost:27017/treegre?auto_reconnect=true', {
    safe: true
});
module.exports = function(treegre) {
    treegre.post('/login', sessionRule.notLoggedIn, function(req, res) {
        var username = req.body.username;
        db.collection('users').find({
            'username': username
        }).toArray(function(err, items) {
            if (items[0].username && items[0].password === crypto.createHash('md5').update(req.body.password).digest('hex')) {
                if (req.body.remember) {
                    req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
                } else {
                    req.session.cookie.expires = false;
                }
                req.session.user = {
                    username: items[0].username
                };
                if (items[0].username == "root") {
                    res.redirect('/admin');
                } else {
                    res.redirect('/users/' + username);
                }
            } else {
                res.render('login', {
                    message: "<h2 class='text-error'>Failed to login</h2>"
                });
            }
        });
    });
    treegre.get('/logout', function(req, res, next) {
        req.session.destroy();
        res.redirect('/login');
    });
    treegre.get('/login', function(req, res) {
        if (req.session.user) {
            var goTo = router.userRoute(req.session.user.username);
            res.redirect(goTo);
        } else {
            req.session.destroy();
            var message = "<center><h2>Please log in before</h2></center>";
            res.render('login', {
                message: message
            });
        }
    });
};
