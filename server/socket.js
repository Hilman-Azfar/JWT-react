module.exports = (app) => {

  const server = require('http').createServer(app);
  const options = {
    origins: '*'
  };

  const io = require('socket.io')(server, options);
  console.log('-- Setting up sockets --');

  io.on('connection', socket => {
    console.log('---------------');
    console.log(socket.handshake.query.username, 'connected');
    console.log('---------------');

    socket.emit('message', 'pinggu chinggu');

    socket.on('message', data => {
      io.emit('message', data);
    })

    socket.on('disconnect', () => {
      console.log(socket.handshake.query.username, 'disconnected');
    })
  })
  

  return server
}