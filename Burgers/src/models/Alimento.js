const mongoose = require('mongoose');
const {Schema} = mongoose;

const AlimentoSchema = new Schema({
    name:{type:String, required:true},
    ingredients:{type:String,required:true},
    price:{type:String,required:true},
    date:{type: Date,default: Date.now}
});

module.exports = mongoose.model('Alimento',AlimentoSchema);