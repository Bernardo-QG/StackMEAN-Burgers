const express = require('express');
const router=express.Router();
//const Bebida = require('../models/Bebida');

//const { isAuthenticated } = require('../helpers/auth');

// Nueva bebida
/*
router.get('/Bebidas/add', (req, res) => {
  res.render('Bebidas/bebida-nueva');
});

router.post('/Bebidas/bebida-nueva',(req, res) => {
  const { name, price } = req.body;
  const errors = [];
  if (!name) {
    errors.push({text: 'Ingresa un nombre'});
  }
  if (!price) {
    errors.push({text: 'Ingresa un precio'});
  }
  if (errors.length > 0) {
    res.render('Bebidas/bebida-nueva', {
      errors,
      name,
      price
    });
  } else {
    const newBebida = new Bebida({ name, price }); 
    newBebida.bebida = req.bebida;//.id;
     newBebida.save();
    req.flash('success_msg', 'Bebida agregado con exito');
    res.redirect('/Bebidas');
  }
});

// Todas las bebidas
router.get('/Bebidas', (req, res) => {
  const bebida = Bebida.find().sort({date: 'desc'});
  //const bebida = Bebida.find().sort({date: 'desc'});
  res.render('Bebidas/Surtido', { bebida });
});

// Edit Bebida
router.get('/Bebidas/edit/:id', (req, res) => {
  const bebida =  Bebida.findById();
  if(bebida.bebida != req.bebida) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/Bebidas');
  } 
  res.render('Bebidas/editar-Bebida', { bebida });
});

router.put('/Bebidas/editar-Bebida/:id', (req, res) => {
  const { name, price } = req.body;
   Bebida.findByIdAndUpdate(r, {name, price});
  req.flash('success_msg', 'Bebida Actualizada con exito');
  res.redirect('/Bebidas');
});

// Delete Bebida
router.delete('/Bebidass/eliminar/:id', (req, res) => {
   Bebida.findByIdAndDelete(req.params/);
  req.flash('success_msg', 'Bebida eliminada con exito');
  res.redirect('/Bebidas');
});

*/
module.exports=router;