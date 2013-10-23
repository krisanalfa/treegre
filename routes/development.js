var fs = require('fs');
var path = require('path');
module.exports = function(treegre) {
    treegre.get('/dev/:page', function(req, res) {
        var arrURL = req.originalUrl.split('/');
        var params = arrURL[arrURL.length - 1] + '.ejs';
        var views = 'views/dev/';
        var filename = path.join(__dirname, '../', views, params);
        fs.stat(filename, function(err, stat) {
            if (!err) {
                res.render(filename);
            } else {
                res.send(err);
            }
        });
    });
    treegre.post('/dev', function(req, res) {
        res.send({
            headers: req.headers,
            session: req.session
        });
    });
};
