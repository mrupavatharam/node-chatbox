var socket = io();

function scrollToBottom(){
    var messages = jQuery('#messages-list');
    var newMessage  = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight )
    {
        messages.scrollTop(scrollHeight);
    }
}


socket.on('connect', function() {
    console.log("connected to server");
})

socket.on('disconnect', function(){
    console.log("Disconnected from server");
})

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
     jQuery("#messages-list").append(html);
     scrollToBottom();
})


socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })
     jQuery("#messages-list").append(html);
     scrollToBottom();
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