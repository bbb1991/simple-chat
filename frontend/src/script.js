let socket;
$(document).ready(function () {

    socket = io.connect('http://localhost:5000/chat');

    socket.on('connect', function () {
        console.log("New user connected");
        socket.emit('connect_b', {});

        socket.on('status', function (data) {
            console.log("Status message: " + JSON.stringify(data));
            $('#messages').append($('<li>').text(data['msg']));
        });

        socket.on('message', function (data) {
            console.log("New message: " + JSON.stringify(data));
            $('#messages').append($('<li>').text(data['uid'] + ": " + data['msg']));
        });
    });
});

$(function () {
    $('form').submit(function () {
        socket.emit('message_b', $('#m').val());
        $('#m').val('');
        return false;
    });
});