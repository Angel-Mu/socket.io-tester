const fs = require('fs');
const app =  require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('port', 3004);

const handler = (req, res) => {
  fs.readFile(__dirname + '/index.html', (err, data) => {
    if (err) {
      return res.status(500).send('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('message', data => console.log(data));
});

app.get('/', handler)

server.listen(3004, () => console.log(`Node server and socket server are runing on port ${app.get('port')}`));

io.sockets.on('connection', (socket) => {
  socket.emit('feed', { hello: 'world' });
  socket.on('message', data => console.log(data));
});