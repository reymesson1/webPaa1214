var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var app = express();
var cors = require('cors')
var AWS = require('aws-sdk');
app.use(cors())
app.options('*', cors())
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
app.use(express.static('static'))
var dba = require('./lib/dba-helper.js')();
app.use(bodyParser.json());
var cookies = false;
var User = require('./models/user.js');
var Order = require('./models/order.js');
var masterController = require('./controller/masterController');
var orderController = require('./controller/orderController');

var albumBucketName = "rekognition-video-console-demo-iad-352250014224-1vio7fvwvq5qve";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:3dd5b3b8-326c-4be6-9f32-67943932637a";
  
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/cookies', function(req,res){

    res.send(cookies);
});

app.post('/cookies', function(req,res){

    var newCookie = req.body;

    if(newCookie.username=='mechy'){
        console.log(req.body);
        cookies=true;
    }
});

app.get('/master', masterController.getMaster)

app.post('/master', masterController.setMaster);

app.post('/payment', masterController.updateMaster);

app.post('/deletemaster', masterController.removeMaster);

app.get('/reporte', masterController.getMasterPartials)

var detail = [];

app.get('/detail',function(req,res){
 
    dba.getDetail({}, function(data){
	    res.send(data);
    });
});

app.post('/detail', function(req,res){

    detail.push(req.body);
    dba.addDetail(req.body)  
    res.send(req.body)
});

app.post('/deletedetail', function(req,res){

    var obj = req.body;  
    dba.removeDetail({"id":obj.id})
    detail.splice(obj.index,1);
});

app.post('/updatedetail',function(req,res){
    var obj = req.body;
    detail[obj.index].name=obj.name;

})

app.get('/logout',function(req,res){

    cookies = false;
    res.redirect('/');
});

app.get('/weeklyreport',function(req,res){

    dba.getWeeklyReport({}, function(data){
            res.send(data);
    });

})

app.get('/weeklyreportrecap',function(req,res){

    dba.getWeeklyReportRecap({}, function(data){
            res.send(data);
    });

})

app.get('/weeklyreportbydev',function(req,res){

	dba.getWeeklyReportbyDevelopment({},function(data){

		res.send(data)
	})
})

app.get('/peluquera', function(req,res){

    dba.getPeluquera({}, function(data){

        res.send(data);

    });

})

app.post('/peluquera', function(req,res){

    dba.addPeluquera(req.body)  
    res.send(req.body)
});

app.post('/deletepeluquera', function(req,res){

    var index = req.body;

    var id = index.id;
    
    dba.setPeluquera({"id":id});

    res.send(req.body);
});

app.post('/register', async (req, res)=>{
    
    var userData = req.body;

    console.log(userData)

    var user = new User({
        "username":userData.username,
        "email":userData.email
    })
    // bcrypt.hash(userData.password, null, null, (err, hash)=>{                   
        user.password = "1234";
    // })
    user.save(function(err){
        if(!err){
            console.log('User saved');
        }
    })
  
})
  
app.post('/login', async (req, res)=>{
    var userData 
    if(req.body.nameValuePairs){
	userData = req.body.nameValuePairs
    }else{
	userData = req.body
    }

    console.log(userData)
	
    var user = await User.findOne({username: userData.username});

    if(!user){        
        return res.status(401).send({message: 'Email or Password Invalid'})
    }

    // bcrypt.compare("1234", "1234", (err, isMatch) =>{
    //     // if(!isMatch){
    //     //     return res.status(401).send({message: 'Email or Password Invalid'})
    //     // }
        
    // var payload = { sub: user._id }

    // var token = jwt.encode(payload, '123')

    // res.status(200).send({token})
    // })

    var payload = { sub: user._id }

    var token = jwt.encode(payload, '123')
  
    console.log({token})

    res.status(200).send({token})

    

})

app.post('/resetpassword', async (req, res)=>{  
    
    var userObj = req.body    
    var decode = jwt.decode(req.body.token,'123')
    userObj.author = decode.sub

    const ObjectId = mongoose.Types.ObjectId;        

    var user = await User.findOne({"_id":ObjectId(userObj.author)},function(err,users){
        if(!err){
            bcrypt.hash(userObj.newpassword, null, null, (err, hash)=>{                   
                users.password = hash;          
            })
            users.save(function(err,user){
                console.log('User saved: ', user);
            })
        }
    })

    res.send({"message":"Successfully reset!"})
})

app.get('/counter', masterController.getMasterCounter);

app.post('/addcounter', masterController.setMasterCounter);  

app.post('/updateitemdetail', masterController.updateMasterItem)

app.post('/updatemasterlike', masterController.updateMasterLike)

app.post('/orders', orderController.getOrder)

app.post('/addorder', orderController.setOrder)

app.post('/removeorder', orderController.removeOrder)

app.post('/newcomment', masterController.setMasterComment)

app.post('/masterpicture', async (req, res)=>{
    
    var files = req.body.files;

    if (!files.length) {
        return alert("Please choose a file to upload first.");
    }

    var file = files[0];
    var fileName = file.name;

    var photoKey = ""+fileName

    var upload = new AWS.S3.ManagedUpload({
        params: {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file,
        ACL: "public-read"
        }
    });

    var promise = upload.promise();

    promise.then(
        function(data) {
        alert("Successfully uploaded photo.");
        viewAlbum(albumName);
        },
        function(err) {
        return alert("There was an error uploading your photo: ", err.message);
        }
    );

    
  
    // var fs = require('fs');    
    // var string = req.body.url
    // var nameImage = req.body.nameImage    
    // var regex = /^data:.+\/(.+);base64,(.*)$/;
    
    // var matches = string.match(regex);
    // var ext = matches[1];
    // var data = matches[2];
    // var buffer = new Buffer(data, 'base64');
    // console.log(buffer)
    // // var dir = './src/assets/'+master.fullname+'/';
    // // if (!fs.existsSync(dir)){
    // //   fs.mkdirSync(dir);
    // // }
    // // fs.writeFileSync('./src/assets/'+master.fullname+'/'+nameImage, buffer); 

    // res.send("ready");
  
})

app.get('/bucket', async(req,res)=>{

    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });

    var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: albumBucketName }
    });

    s3.listObjects({ Delimiter: "/" }, function(err, data) {

        if (err) {
            return alert("There was an error listing your albums: " + err.message);
          } else {
              console.log(data)
          }

    })

})

mongoose.connect('mongodb://localhost:27017/spf',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(8084);
