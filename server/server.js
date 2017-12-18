const path = require('path');
const express = require('express');
const http = require('http');
const socketIO =  require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) =>{

    console.log("New User Connected");

    socket.emit('newMessage',{
        from:"manoj",
        text:"Initial Message from Server",
        createdAt:new Date()
    })

    socket.on('createMessage', (message) => {
        console.log("Received Message from Client",message);
        io.emit('newMessage',{
            from: message.from,
            text:message.text,
            createdAt:message.createdAt 
        })
    })

    socket.on('disconnect',()=>{
        console.log("User Disconnected");
    })
})

app.use(express.static(publicPath));

server.listen(3000, ()=>{
    console.log(`Server Started in Port ${port}`);
})