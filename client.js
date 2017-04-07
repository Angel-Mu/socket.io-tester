const io = require('socket.io-client');
const socket = io.connect('http://localhost:3004');
socket.on('connect', () => console.log("socket connected"));
socket.on('feed', data => console.log('feed event listened \n', data));
socket.emit('message', { text: 'Message from client to server' });