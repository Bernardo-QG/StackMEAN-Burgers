const express = require('express');
const router=express.Router();

router.get('/pedidos',(req,res)=>{
    res.render('pedidos/order');
});
router.get('/pedidos/add',(req,res)=>{
    res.render('pedidos/new-order');
});
router.get('/pedidos/edit',(req,res)=>{
    res.render('pedidos/edit-order');
});

module.exports=router;