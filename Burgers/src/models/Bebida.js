const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;

const BebidaSchema = Schema({
    name:{type: String, require: true},
    price: {type1: String, require: true},
    date:{type: Date,default: Date.now}
});

module.exports=mongoose.model('Bebida',BebidaSchema);