var users = {};

module.exports = function(io) {
    io.sockets.on('connection', function (socket) {
        socket.on('event', function (data) {
            socket.broadcast.emit('whoa', data);
        });

        socket.on('hello', function (data) {
            var name        = data.name;
            var username    = data.username;
            var sid         = socket.id;
            users[sid]      = { username : username, name : name };
            socket.emit('hello', { users : users });
            socket.broadcast.emit('hello', { users : users });
        });

        socket.on('disconnect', function () {
            var sid = socket.id;
            delete users[sid];
            socket.broadcast.emit('hello', { users : users });
        });
    });
};
