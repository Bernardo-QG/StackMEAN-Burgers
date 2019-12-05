const mongoose = require('mongoose');
const {Schema} = mongoose;


const ElementoSchema = new Schema({
    idElemento:{type:String,required:true},
    Nombre:{type:String,required:true},
    Cantidad:{type:String,required:true},
    Precio:{type:String,required:true}, 
});

const PedidoSchema = new Schema({
    idPedido:{type:String, required:true},
    Elementos:[ElementoSchema],
    Total:{type:String,required:true},
    date:{type: Date,default: Date.now}
});

module.exports = mongoose.model('Pedido',PedidoSchema);