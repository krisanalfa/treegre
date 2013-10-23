exports.userRoute = function(username) {
    var goTo ='';
    if (username == "root") {
        goTo = '/admin';
    } else {
        goTo = '/users/' + username;
    }
    return goTo;
};
