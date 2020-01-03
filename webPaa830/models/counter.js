var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

  var userSchema = new mongoose.Schema({
    quantity: Number    
})

 module.exports = mongoose.model('Counter', userSchema) 