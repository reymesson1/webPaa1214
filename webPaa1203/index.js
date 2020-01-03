var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var second = 59;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

const kafka = require('kafka-node');
let kafkaHost = 'localhost:9092';
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: kafkaHost});

const consumer = new Consumer(
    client,
    [
        { topic: 'test' },
    ],
    {
        autoCommit: false,
        fromOffset: 'latest'
    }
);

consumer.on('message', function (message) {
    // console.log(message);
    callSockets(io, message.value);
});

consumer.on('error', function (err) {
    console.log('Error:',err);
});

consumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
});

function callSockets(io, message){

    var result = JSON.parse(message)    
    io.sockets.emit('update', message);
    if(result.redlight){

        console.log('update red', message)
        io.sockets.emit('update red', message);
    }else{

        if(result.second>=30){

            console.log('update green', message)
            io.sockets.emit('update green', message);
        }
    }
}

http.listen(8081, function(){
    console.log('listening on *:8081');
});