// function openNav() {
//     document.getElementById("myNav").style.height = "100%";
// }
//
// function closeNav() {
//     document.getElementById("myNav").style.height = "0%";
// }
var memes = {
    ":trollface:": "<img src='http://www.unixstickers.com/image/data/stickers/meme/troll/Troll-face.sh.png'>",
    ":okay:": "<img src='http://www.unixstickers.com/image/data/stickers/meme/troll/Troll-face.sh.png'>"
};
function append_message(message) {

    console.log(message, message.search(/:.*:/g));
    if (message.search(/:.*:/g) >= 0) {
        message = insert_meme(message);
    }
    $('#messages').append($("<li>" + message + "</li>"));
}

function insert_meme(message) {
    for (var m in memes) {
        console.log(m);
        message.replace(/m/, memes[m]);
        console.log(message);
    }

    return message;
}

let socket;
$(document).ready(function () {

    var address = "http://localhost:5000/chat";
    socket = io.connect(address);

    console.log(socket);
    if (!socket.connected) {
        alert("Cannot connect to backend to " + address + "!\n Maybe backend not started?")
    }

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