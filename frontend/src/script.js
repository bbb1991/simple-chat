// function openNav() {
//     document.getElementById("myNav").style.height = "100%";
// }
//
// function closeNav() {
//     document.getElementById("myNav").style.height = "0%";
// }

function append_message(message) {

    alert(message + message.search("/:[\\w]+:/gi"));
    if (message.search("/:.*:/gi") >= 0) {
        message = insert_meme(message);
    }
    $('#messages').append($("<li>" + message + "</li>"));
}

function insert_meme(message) {
    return message + " meme!!!!!!!!!!!!!1";
}

let socket;
$(document).ready(function () {

    socket = io.connect('http://localhost:5000/chat');

    // openNav();
    // New user connection
    socket.on('connect', function () {
        console.log("New user connected");
        socket.emit('connect_b', {});
        append_message("Welcome to simple chat! To get help type <b>/help</b>");

        // Status message
        socket.on('status', function (data) {
            console.log("Status message: " + JSON.stringify(data));
            append_message(data['msg']);
        });

        // New message
        socket.on('message', function (data) {
            console.log("New message: " + JSON.stringify(data));
            append_message("<b>" + data['uid'] + "</b>: " + data['msg']);
        });

        socket.on('users', function (data) {
            console.log("Updating list of users: " + data);
            var users_ul = $('#users');
            users_ul.empty();

            for (var i = 0; i < data.length; i++) {
                users_ul.append('<li>')
                    .text(data[i]);
            }
        })
    });
});

$(function () {
    $('form').submit(function () {
        socket.emit('message_b', $('#m').val());
        $('#m').val('');
        return false;
    });
});