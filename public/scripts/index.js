var socket = io();
socket.on('connect', function() {
    console.log("connected to server");
    socket.emit('createMessage',{
        to:"suresh",
        text:"hey hw r u",
        createdAt: new Date()
    })
})

socket.on('disconnect', function(){
    console.log("Disconnected from server");
})

socket.on('newMessage', function(message){
    console.log("Client received new message");
    console.log(message);
})

socket.emit('createMessage',{
    from:"Agent007",text:"Hi"
}, function(message){
    console.log(message);
});

