var mongoose = require('mongoose');
var Master = require('../models/master.js');
var Counter = require('../models/counter.js');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

exports.getMaster = async(req,res)=>{

  var master = await Master.find({"status":{$ne:"removed"}})
  
  res.send(master);
}

exports.setMaster = async(req,res)=>{
  
    var master = new Master(req.body);

    console.log(req.body)
    
    master.save(function(err){
      if(!err){
        console.log('Master saved');
      }
    })
    
    res.send(req.body);
}

exports.updateMaster = async(req,res)=>{

  var master = await Master.findOne({"id":req.body.id},function(err,m){

      if(!err){
          
          m.payment=req.body.payment
          m.status="pagada"
          m.save(function(err, s){
              console.log('Payment Updated');
          })
      }
  })

  res.send(req.body);

}

exports.removeMaster = async(req,res)=>{

  var userData = req.body.token;

  var token = jwt.decode(req.body.token, '123')

  if(token.sub == "5d091ad3c382341e4c088c72"){//username:supreme

    var master = await Master.findOne({"id":req.body.id},function(err,m){
    
          if(!err){
              
              m.status="removed"
              m.save(function(err, s){
                  console.log('Removed Updated');
              })
          }
      })
    

  }
  
  res.send(req.body);


}

exports.getMasterPartials = async(req,res)=>{

  var master = await Master.find({})

  res.send(master)

}

exports.setMasterCounter = async(req,res)=>{

    var id = mongoose.Types.ObjectId('5d287f5f6e795adb18ec651c');  

    var counter = await Counter.findOneAndUpdate(
    { "_id" : id},
    {
      $inc: {
        quantity:1
      }
    }
  ); 

   res.send(req.body)
}

exports.getMasterCounter = async(req,res)=>{

    var counter = await Counter.find(); 

    res.send(counter);  
}

exports.updateMasterItem = async(req,res)=>{

        var decode = jwt.decode(req.body.user,'123')

        var tempUser = ""

        var user = await User.findOne({
            "_id":mongoose.Types.ObjectId(decode.sub)
        }, function(err,u){            
            tempUser = u.username
        })
        
        setTimeout(async() => {

            var newMaster = req.body
            newMaster["user"] = tempUser

            var master = await Master.findOne(
                {"id": req.body.idOrder}, 
                function(err,m){
                    if(!err){
                        m.item.push(newMaster)
                        m.save(function(err,s){
                            console.log('Adding Items');
                        })    
                    }
                }
            )
        }, 5000);        
  }

  exports.updateMasterLike = async(req,res)=>{
      
      var newSubmit = req.body;
      
      if(newSubmit.press=="Unlike"){
          
          var master = await Master.findOne(
              {"id":newSubmit.id},
              function(err,m){
                  if(!err){                
                      m.like -= 1
                      m.isLiked = "Like"
                      m.save(function(err,m){
                          console.log('Updated Like')
                        })
                    }
                    
                }
            )
        }else{
            
            var master = await Master.findOne(
                {"id":newSubmit.id},
                function(err,m){
                    if(!err){                
                        m.like += 1
                        m.isLiked = "Unlike"
                        m.save(function(err,m){
                            console.log('Updated Like')
                        })
                    }
                    
                }
            )
        }
        
        res.send(newSubmit);
        
        
    }
exports.setMasterComment = async(req,res)=>{

    let newSubmit = req.body

    var master = await Master.findOne(
        {"id":newSubmit.id},
        function(err,m){
            if(!err){                                
                m.comments.push(req.body)
                m.save(function(err,m){
                    console.log('Updated Comment')
                })
            }
            
        }
    )

    res.send(req.body)
}