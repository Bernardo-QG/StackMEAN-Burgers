const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;

const AlimentoSchema = Schema({
    name:{type:String, require:true},
    ingredints: {type: String, require:true},
    price: {type: Number, require: true},
    date:{type:Date,default: Date.now}
});

module.exports=mongoose.model('Alimento',AlimentoSchema);