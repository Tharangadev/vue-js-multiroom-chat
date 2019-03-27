var express = require('express');
var http = require('http');
var express = express();
let cors = require('cors')

express.use(cors())

var server = http.createServer(express);
var io = require('socket.io').listen(server);

var usernames = []
var rooms = ['commonroom', 'Astronomy', 'Science', 'Botany', 'Music', 'Tesla', 'Spacex', 'BlueOrigin']
var room_users = {
    commonroom: [],
    Astronomy: [],
    Science: [],
    Botany: [],
    Music: [],
    Tesla: [],
    Spacex: [],
    BlueOrigin: [],
}

io.on('connect', (socket) => {

    socket.on('adduser', function (username) {
        socket.username = username
        socket.room = 'commonroom'

        room_users[socket.room].push(username)
        socket.join('commonroom')
        socket.emit('chat_update', {
            username: socket.username,
            message: `you have connected to room ${socket.room}`
        })
        io.to(socket.room).emit('site_data', {
            users: room_users[socket.room],
            rooms,
            current_room: socket.room
        })
        socket.broadcast.to(socket.room).emit('update_update', {
            username: socket.username,
            message: `${socket.username} has connected to room ${socket.room}`
        })

    })
    socket.on('chat_message', (data) => {
        io.sockets.in(socket.room).emit('chat_update', {
            username: socket.username,
            message: data
        })
    })
    socket.on('switchrooms', (newroom) => {
        socket.leave(socket.room)
        socket.join(newroom)
        room_users[socket.room] = room_users[socket.room].filter((i) => {
            return i != socket.username
        })
        socket.room = newroom
        room_users[socket.room].push(socket.username)
        socket.emit('chat_update', {
            username: socket.username,
            message: `you have connected to room ${socket.room}`
        })
        io.in(socket.room).emit('site_data', {
            users: room_users[socket.room],
            rooms,
            current_room: socket.room
        })
        socket.broadcast.to(socket.room).emit('update_update', {
            username: socket.username,
            message: `${socket.username} has connected to room ${socket.room}`
        })
    })
})

server.listen(3000);