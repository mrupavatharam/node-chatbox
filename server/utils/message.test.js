var expect = require('expect');
var {generateMessage, generateLocationMessage}  = require('./message');

describe('generateMessage', ()=>{
    it('should generate Correct Message Object',() => {
        var from  = 'Manoj';
        var text = "Test Message";
        var message  = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text})
    })
})

describe('generateLocationMessage', ()=>{
    it('should generate Correct Location Message Object', ()=>{
        var from = "Manoj";
        var lat = "56.4333";
        var url = "https://google.com/maps?q=56.4333,76.3234";
        var lon = "76.3234";
        var message = generateLocationMessage(from, lat, lon);
        expect(message.createdAt).toBeA('number');
        expect(message.url).toEqual(url);
        expect(message).toInclude({from, url });        
    })
})

