var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    email: String,
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    name: String,
    description: String
})

module.exports = mongoose.model('User', userSchema)