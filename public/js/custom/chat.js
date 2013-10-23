var socket = io.connect();
var len = window.location.pathname.split('/').length;
var params = window.location.pathname.split('/')[len - 1];
/*
Temporarily disabled for development status
var url     = 'https://localhost:8000/jsonp/' + params;
*/
var chatBox = $('.chatBox');
var text = '';
var chat = '';
var name = '';
var username = '';
var antiJunk = '';
var count = 0;
var _count = 0;
$(document).ready(function() {
    if ($('#text').val() === "") {
        $('#chatButton').attr('disabled', 'disabled');
    }
    socket.on('error', function(reason) {
        console.error('Unable to connect Socket.IO', reason);
    });
    name = $('#name').val();
    username = $('#username').val();

    function sendMyChat() {
        chat = $.trim($('#text').val());
        text = $.trim(chatBox.html());
        if (antiJunk === '') {
            antiJunk = chat;
        }
        if (chat == antiJunk) {
            count++;
            if (count >= 3) {
                if (count >= 4 && chat == antiJunk) {
                    $('#bitchPlease').modal('show');
                    $('#bitchPlease').on('hidden', function() {
                        socket.disconnect();
                        window.location.href = "/logout";
                    });
                }
                if (_count >= 1) {
                    $('#bitchPlease').modal('show');
                    $('#bitchPlease').on('hidden', function() {
                        socket.disconnect();
                        window.location.href = "/logout";
                    });
                }
                if (_count === 0) {
                    _count++;
                    $('#junkAlert').modal('show');
                }
            }
        }
        chatBox.html(text + "<p class='chatText'>You say: " + $('#text').val() + '</p>');
        $(".chatText").emoticonize();
        socket.emit('event', {
            chat: chat,
            name: name
        });
        $('#text').val('');
        chatBox.animate({
            scrollTop: chatBox[0].scrollHeight
        }, 1000);
        $('#chatButton').attr('disabled', 'disabled');
    }
    socket.on('whoa', function(data) {
        text = $.trim(chatBox.html());
        $(".chatBox").html(text + "<p class='chatText'>" + data.name + ' says: ' + data.chat + '</p>');
        $(".chatText").emoticonize();
        $(".chatBox").animate({
            scrollTop: $(".chatBox")[0].scrollHeight
        }, 1000);
    });
    socket.on('bye', function(data) {
        console.log(data.name + ' disconnected');
    });
    socket.on('connect', function() {
        socket.emit('hello', {
            name: name,
            username: username
        });
    });
    socket.on('hello', function(data) {
        $(".userOnline").html('');
        for (var i in data.users) {
            $(".userOnline").append(data.users[i].name + "<br>");
        }
    });
    $('#chatButton').click(function(e) {
        e.preventDefault();
        sendMyChat();
    });
    $('#text').keypress(function(e) {
        if (e.which == 13 && $('#text').val() !== "") {
            sendMyChat();
        }
    });
    $(document).on('input paste', '#text', function() {
        if ($('#text').val() !== "") {
            $('#chatButton').removeAttr('disabled');
        } else {
            $('#chatButton').attr('disabled', 'disabled');
        }
    });
    $('#clearChat').click(function(e) {
        e.preventDefault();
        $(".chatBox").html('');
    });
    $('#badJunker').click(function(e) {
        e.preventDefault();
        socket.disconnect();
        window.location.href = "/logout";
    });
    $('#logout').click(function(e) {
        e.preventDefault();
        socket.disconnect();
        window.location.href = "/logout";
    });
});
