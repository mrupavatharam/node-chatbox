var expect = require('expect');
var {generateMessage}  = require('./message');

describe('generateMessage', ()=>{
    it('should generate Correct Message Object',() => {
        var from  = 'Manoj';
        var text = "Test Message";
        var message  = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text})
    })
})