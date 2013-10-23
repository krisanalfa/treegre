exports.getDate = function() {
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var year = date.getFullYear();
    var hours = ("0" + (1 + date.getHours())).slice(-2);
    var minutes = ("0" + (1 + date.getMinutes())).slice(-2);
    var seconds = ("0" + (1 + date.getSeconds())).slice(-2);
    var toDay = (day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds);
    return toDay;
};

exports.getYear = function() {
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var year = date.getFullYear();
    var hours = ("0" + (1 + date.getHours())).slice(-2);
    var minutes = ("0" + (1 + date.getMinutes())).slice(-2);
    var seconds = ("0" + (1 + date.getSeconds())).slice(-2);
    var toDay = (day + '-' + month + '-' + year);
    return toDay;
};

exports.createID = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

    for( var i=0; i < 35; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

exports.getLastSegmentUrl = function(string) {
    return string.split('/')[string.split('/').length -1];
};
