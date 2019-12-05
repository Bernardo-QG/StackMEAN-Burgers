const express = require('express');
const router=express.Router();
const Alimento = require('../models/Alimento');
const Bebida = require('../models/Bebida');
const Pedido = require('../models/Pedido');
const {isAuthenticated} = require('../helpers/auth');
var pedido=[];
var Total=0;


//Pagina inicio de pedidos
router.get('/pedidos',isAuthenticated,async(req,res)=>{    
    pedido=[];
    Total=0;
    const pedidos = await Pedido.find().sort({date: 'desc'});
    console.log(pedidos)
    res.render('pedidos/order',{pedidos});
});


// Agregar pedido
router.get('/pedidos/add',isAuthenticated,(req,res)=>{
    res.render('pedidos/new-order');    
});

router.get('/pedidos/add/alimentos',isAuthenticated,async(req,res)=>{
    const alimentos = await Alimento.find().sort({date: 'desc'});
    res.render('pedidos/order-alimentos',{alimentos});    
});

router.post('/pedidos/order-alimentos',isAuthenticated, async(req,res)=>{
    //console.log(req.body);
    const yey = req.body;

    for (var indice in yey) {
        if(yey[indice]!="" && yey[indice]>0){
            const mialimento = await Alimento.find({_id:indice});
            pedido.push({miid:indice, minombre: mialimento[0]["name"],micantidad:yey[indice],miprice:mialimento[0]["price"]*yey[indice]});
            Total=Total+mialimento[0]["price"]*yey[indice];
        }
        //console.log("En el índice '" + indice + "' hay este valor: " + yey[indice]);
    }
  
    res.render('pedidos/new-order',{pedido,Total});
    
});


router.get('/pedidos/add/bebidas',isAuthenticated,async(req,res)=>{
    const bebidas = await Bebida.find().sort({date: 'desc'});
    res.render('pedidos/order-bebidas',{bebidas});    
});

router.post('/pedidos/order-bebidas',isAuthenticated, async(req,res)=>{
    const yey = req.body;
    for (var indice in yey) {
        if(yey[indice]!="" && yey[indice]>0){
            const mibebida = await Bebida.find({_id:indice});
            pedido.push({miid:indice, minombre: mibebida[0]["name"],micantidad:yey[indice],miprice:mibebida[0]["price"]*yey[indice]});
            Total=Total+mibebida[0]["price"]*yey[indice];
        }
        //console.log("En el índice '" + indice + "' hay este valor: " + yey[indice]);
    }
    
            res.render('pedidos/new-order',{pedido,Total});
    
});

router.post('/pedidos/add/enviar',isAuthenticated, async(req,res)=>{
    if(pedido.length>0){
        var Elementos=[];
        for(var i in pedido){
            Elementos.push({idElemento:pedido[i]["miid"],Nombre:pedido[i]["minombre"],Cantidad:pedido[i]["micantidad"],Precio:pedido[i]["miprice"]});
        }  
        const idPedido = await Pedido.distinct('idPedido').count();
       
        const newPedido=new Pedido({idPedido,Elementos,Total});
            //newNote.user=req.user.id;
        await newPedido.save();
        req.flash('success_msg','Pedido #'+ idPedido+' added susccessfully');
        
        
    }
    else{
        req.flash('error_msg', 'Pedido not add.');   
        
    }
    res.render('pedidos/order');
    

    
});




module.exports=router;






