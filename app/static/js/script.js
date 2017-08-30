var socket;
$(document).ready(function () {
    socket = io.connect('http://' + document.domain + ':' + location.port + '/chat');
    socket.emit('load', {"chat_id": 1}); // loading chat history on page loading TODO change CHAT_ID
    socket.on('connect', function () {
        socket.emit('joined', {});
    });
    socket.on('status', function (data) { // print notify when user connected or disconnected
        $('#chat').val($('#chat').val() + '<' + data.msg + '>\n');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
    });
    socket.on('load_messages', function (data) {
        var obj = data.msg;
        for (var i = 0; i < obj['chat'].length; i++) {
            print_message({"msg": (obj['chat'][i].uid === 1 ? "Support" : "Client") + ": " + obj['chat'][i].msg})
        }
    });
    socket.on('message', function (data) {
        print_message(data)
    });
    $('#text').keypress(function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            text = $('#text').val();
            $('#text').val('');
            socket.emit('text', {msg: text});
        }
    });
});

function print_message(data) {
    $('#chat').val($('#chat').val() + data.msg + '\n');
    $('#chat').scrollTop($('#chat')[0].scrollHeight);
}

function leave_room() {
    socket.emit('left', {}, function () {
        socket.disconnect();

        // go back to the login page
        window.location.href = "/";
    });
}