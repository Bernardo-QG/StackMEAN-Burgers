const express = require('express');
const router=express.Router();
const Alimento = require('../models/Alimento');

router.get('/Alimentos', async (req, res) => {
  const alimento = await Alimento.find().sort({date: 'desc'});
  res.render('alimentos/Surtido',{alimento});
});

router.get('/Alimentos/add', (req, res) => {
  res.render('alimentos/alimento-nuevo');
});

router.post('/Alimentos/alimento-nuevo', (req, res) => {
  const { name, ingredients, price} = req.body;// cambiar todo el cuerpo 
  const errors = [];
  if (!name)   errors.push({text: 'Ingresa un nombre'});
  if (!ingredients)   errors.push({text: 'Ingresa un ingredients'});
  if (!price)   errors.push({text: 'Ingresa un price'});

  if (errors.length > 0) {
    res.render('alimentos/alimento-nuevo', {// cambair el curtpo de lo que pide ejemplo ingredientes nombre y precio
      errors, name, ingredients,price
    });
  } else {
    const newAlimento = new Alimento({name, ingredients,price });// cambair a sus caracteristicas 
    newAlimento.save();
    req.flash('success_msg', 'Alimento agregado con exito');
    res.redirect('/Alimentos');
  }
});




module.exports=router;