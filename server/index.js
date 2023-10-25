
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const  {addUser1,removeUser,getUser,getUsersInRoom} = require('./users') ;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your client's origin
    methods: ['GET', 'POST'], // Adjust the allowed methods as needed
    credentials: true, // Allow cookies and credentials (if needed)
  },
});

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join',({name,room},callback) => {
    console.log(name,room) ;
    const {error,user} = addUser1({ id:socket.id , name ,room}) ;
    if(error) return callback(error) ;
    socket.emit('message',{user:'admin',text:`${user.name}, welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`});

    socket.join(user.room) ;
    callback();
    socket.on('sendMessage',(message,callback) => {
      const user = getUser(socket.id) ;
      console.log("socket id at server => ",socket.id);
      console.log("user at server => ",user);
      io.to(user.room).emit('message',{user:user.name,text:message}) ;
      callback() ;
    })
  });
  socket.on('disconnect', () => {
    console.log('user disconnected !');
  });
});

const router = require('./router');

app.use(cors()); // Enable CORS for Express routes

app.use(router);

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
