const express = require('express');
const router=express.Router();
const Alimento = require('../models/Alimento');

router.get('/pedidos',(req,res)=>{    
    res.render('pedidos/order');
});


router.get('/pedidos/add',(req,res)=>{
    res.render('pedidos/new-order');    
});

router.get('/pedidos/add/alimentos',async(req,res)=>{
    const alimentos = await Alimento.find().sort({date: 'desc'});
    res.render('pedidos/order-alimentos',{alimentos});    
});



router.get('/pedidos/edit',(req,res)=>{
    res.render('pedidos/edit-order');
});



module.exports=router;



