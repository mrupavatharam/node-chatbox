var socket = io();
socket.on('connect', function() {
    console.log("connected to server");
})

socket.on('disconnect', function(){
    console.log("Disconnected from server");
})

socket.on('newLocationMessage', function(message){
    console.log("received new location message");
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery("#messages-list").append(li);
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
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert("You are using old Browser..change Browser");
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    }, function(){
        alert("Unable to Fetch Location");
    })
})