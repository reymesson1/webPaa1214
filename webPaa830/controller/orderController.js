var mongoose = require('mongoose');
var Master = require('../models/master.js');
var Counter = require('../models/counter.js');
var Order = require('../models/order.js');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

var userDB = ""

setLogin = async(frontenduser) =>{

    var id = mongoose.Types.ObjectId(frontenduser);  

    var user = await User.findOne(
        {"_id": id},
        function(err,u){

            if(!err){

                userDB = u.username
            }            
        }
    )
}

exports.getOrder = async(req,res)=>{

  var decode = jwt.decode(req.body.user,'123')

  setLogin(decode.sub)

  setTimeout(async() => {
    
    var order = await Order.find({"username":userDB})
    
    res.send(order);

  }, 5000);

  
}

exports.setOrder = async(req,res)=>{
  
  var decode = jwt.decode(req.body.username,'123')
  
  setLogin(decode.sub)
  
  setTimeout(() => {
  
    var order = req.body
    order["username"] = userDB

    var orderDB = new Order(order); 
    orderDB.save(function(err,o){
        
        if(!err){
            console.log('Order Saved!')
        }

    })   
    res.send(orderDB)
  }, 5000);


}

exports.removeOrder = async(req,res)=>{
  

    console.log(req.body);

    var order = await Order.remove({"id":req.body.id},function(err,m){
        
        if(!err){
            
        
                console.log('Removed Updated');
        
        }
    })
}