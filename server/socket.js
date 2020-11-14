let clients = new Map();

module.exports = (app) => {

  const server = require('http').createServer(app);
  const options = {
    origins: '*'
  };

  const io = require('socket.io')(server, options);
  console.log('-- Setting up sockets --');

  io.on('connection', socket => {
    let id = socket.handshake.query.id;
    console.log('---------------');
    console.log(id, 'connected');
    console.log('---------------');
    clients.set(id, socket.id);

    socket.on('join', ({roomid, prev}) => {
      socket.leave(prev);
      socket.join(roomid);
    })

    socket.on('sendMessage', ({roomid, content, from}) => {
      io.to(roomid).emit('message', {content, from})
    })


    socket.on('disconnect', () => {
      console.log(id, 'disconnected');
      clients.delete(id);
    })
  })
  

  return server
}