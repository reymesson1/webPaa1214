var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    id: String,
    idOrder: String,
    date: String,
    name: String,
    project: Number,
    agregado: Number,
    desc: Number,
    itbis: Number,
    grandTotal: Number,
    fechaentrega: String,
    horaentrega: String,
    balance: Number,
    pending: Number,
    current: Number,
    tipopago: String,
    ncf: String,
    status: String,
    item: Array,
    comments: Array,
    payment: String,
    like: Number,
    isLiked: String,
    isLikedArr: Array,
    image: String,
    user: String
})

module.exports = mongoose.model('Master', userSchema)