const express = require('express');
const router=express.Router();
const Alimento = require('../models/Alimento');
const Bebida = require('../models/Bebida');
var pedido=[];


router.get('/pedidos',(req,res)=>{    
    pedido=[];
    res.render('pedidos/order');
});


router.get('/pedidos/add',(req,res)=>{
    res.render('pedidos/new-order');    
});

router.get('/pedidos/add/alimentos',async(req,res)=>{
    const alimentos = await Alimento.find().sort({date: 'desc'});
    res.render('pedidos/order-alimentos',{alimentos});    
});

router.post('/pedidos/order-alimentos', async(req,res)=>{
    //console.log(req.body);
    const yey = req.body;

    for (var indice in yey) {
        if(yey[indice]!="" && yey[indice]>0){
            const mialimento = await Alimento.find({_id:indice});
            pedido.push({miid:indice, minombre: mialimento[0]["name"],micantidad:yey[indice],miprice:mialimento[0]["price"]*yey[indice]});
        }
        //console.log("En el índice '" + indice + "' hay este valor: " + yey[indice]);
    }
   
            res.render('pedidos/new-order',{pedido});
    
});


router.get('/pedidos/add/bebidas',async(req,res)=>{
    const bebidas = await Bebida.find().sort({date: 'desc'});
    res.render('pedidos/order-bebidas',{bebidas});    
});

router.post('/pedidos/order-bebidas', async(req,res)=>{
    const yey = req.body;
    for (var indice in yey) {
        if(yey[indice]!="" && yey[indice]>0){
            const mibebida = await Bebida.find({_id:indice});
            pedido.push({miid:indice, minombre: mibebida[0]["name"],micantidad:yey[indice],miprice:mibebida[0]["price"]*yey[indice]});
        }
        //console.log("En el índice '" + indice + "' hay este valor: " + yey[indice]);
    }
   
            res.render('pedidos/new-order',{pedido});
    
});




router.get('/pedidos/edit',(req,res)=>{
    res.render('pedidos/ edit-order');
});



module.exports=router;






