var
    app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')
    , numUsers = 0
;

app.listen(8080);

function handler(req, res) {
    fs.readFile(
        __dirname + '/index.html', 
        function(err, data) {
            res.writeHead(200);
            res.end(data);
        }
    );
}

io.sockets.on('connection', function(socket) {
    io.sockets.emit('message', 'User #' + (++numUsers) + ' Joined');

    socket.on('message', function(msg) {
        io.sockets.emit('message', msg);
    });
});
