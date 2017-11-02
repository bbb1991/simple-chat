var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);

app.use(express.static(__dirname + '/src'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
