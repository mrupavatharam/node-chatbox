var socket = io();
socket.on('connect', function() {
    console.log("connected to server");
})

socket.on('disconnect', function(){
    console.log("Disconnected from server");
})

socket.on('newMessage', function(message){
    console.log("Client received new message");
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery("#messages-list").append(li);
})

jQuery('#newmessage-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', { 
        from:"User1",
        text:jQuery('[name=messageBox]').val()
    }, function(a){
        console.log("ack")
    })
})