var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Kafka = require('no-kafka');
var producer = new Kafka.Producer();

const puppeteer = require('puppeteer');


var second = 11;
var secondpeople = 10;
var obj = {
    "second":0
}

var dynamodb = []

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', async(socket)=>{
    console.log('a user connected');
    socket.on('joined', function(data) {
        console.log(data);
        socket.emit('acknowledge', 'Acknowledged');
    });
    socket.on('chat message', async(msg)=>{
        console.log('message: ' + msg);
        second = 31;
        people = true
        secondpeople = 31
        socket.emit('response message', msg + '  from server');
        //socket.broadcast.emit('response message', msg + '  from server');

        (async () => {
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            // await page.goto('https://google.com', {waitUntil: 'networkidle2'});
            await page.goto('http://localhost:8084/', {waitUntil: 'networkidle2'});
            
            setTimeout(async() => {
                
                console.log('ready')

                const selector = '.buttonPrint';
                // const selector = '.content';
                
                await page.click(selector, { button: "left" });

                // await page.keyboard.press('ArrowDown', { delay: 100});                
                // await page.keyboard.press('KeyP', { delay: 300});
                // await page.keyboard.up('Control', { delay: 400});
                
                
                                
                
                // await page.keyboard.press('Enter');                
                
                // await page.keyboard.press('ArrowDown');                
                // await page.keyboard.press('ArrowDown', {delay: 950});
                // await page.keyboard.down('Enter', {delay: 550});
                // await page.keyboard.up('Control', {delay: 750});
                // await page.keyboard.down('Control', {delay: 950});                
                // await page.keyboard.sendCharacter('P', {delay: 950});
                // await page.keyboard.press('KeyV', {delay: 950});
                
            }, 5000);

            setTimeout(async() => {

                console.log('ready2')                
                await page.click('body');
                
            }, 8000);

            
            // page.keyboard.up('Shift', {delay: 250});
            // await page.pdf({path: 'hn.pdf', format: 'A4'});        

            //  await browser.close();
          })();

          


    });

    socket.on('chat message two', function(msg){
        console.log('message two: ' + msg);

        dynamodb.push( JSON.parse(msg) )

        
        // socket.emit('response message', msg + '  from server');
        //socket.broadcast.emit('response message', msg + '  from server');
    });
});

var redlight = true
var people = false

app.get('/getStep', function(req,res){

    res.send(dynamodb)
})

function timeoutFunc() {

        obj["second"] = second
        obj["latitude"] = 18.45
        obj["longitude"] = -69.93
        obj["redlight"] = redlight
        obj["people"] = people
        obj["secondpeople"] = secondpeople

        // console.log(obj)
    
        producer.init().then(function(){
        producer.send({
                topic: 'test',
                partition: 0,
                message: {
                    value: JSON.stringify(obj)
                }
            });
        })
        .then(function (result) {
            /*
            [ { topic: 'kafka-test-topic', partition: 0, offset: 353 } ]
            */
        });
    
        if(second>0){
            
            second--   
        }else{
            if(redlight){

                second = 11
            }else{

                second = 59
            }
        }

        if(secondpeople>0){
            
            secondpeople--   
        }else{
            
            secondpeople = 10
        }

        if(second==0){
            redlight = !redlight  
            people = false   
            secondpeople = 10       
        }

        setTimeout(timeoutFunc, 1000);
}
    
//timeoutFunc();

http.listen(8080, function(){
    console.log('listening on *:8080');
});