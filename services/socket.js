
// init socket 
exports.init = ()=>{
    io.on('connection', (socket) => {
        console.log('a user connected');
        
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });

        socket.on('join', function(room) {
          console.log(`user join ${room}`)
          socket.join(room);
        });
    });
}

exports.send = (room, msg)=>{
    io.sockets.in(room).emit('event', msg);
}
