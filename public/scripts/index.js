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
    var messageTextBox = jQuery('[name=messageBox]');
    socket.emit('createMessage', { 
        from:"User1",
        text:messageTextBox.val()
    }, function(a){
        messageTextBox.val('');
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert("You are using old Browser..change Browser");
    }
    locationButton.attr('disabled','disabled').text("Sending Location ...");
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
        locationButton.removeAttr('disabled').text("Send Location");
    }, function(){
        alert("Unable to Fetch Location");
        locationButton.removeAttr('disabled').text("Send Location");
    })
})