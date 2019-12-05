const express = require('express');
const router=express.Router();
const Bebida = require('../models/Bebida');
const {isAuthenticated} = require('../helpers/auth');

//nueva bebida
router.get('/Bebidas',isAuthenticated, async (req, res) => {
  const bebida = await Bebida.find().sort({date: 'desc'});
  res.render('Bebidas/Surtido',{bebida});
});

router.get('/Bebidas/add',isAuthenticated, (req, res) => {
  res.render('Bebidas/bebida-nueva');
});

router.post('/Bebidas/bebida-nueva',isAuthenticated, async (req, res) => {
  const { name, price} = req.body; 
  const errors = [];
  if (!name)   errors.push({text: 'Ingresa un nombre'});
  if (!price)   errors.push({text: 'Ingresa un precio'});

  if (errors.length > 0) {
    res.render('Bebidas/bebida-nueva', {
      errors, name,price
    });
  } else {
   
    const newBebida = new Bebida({name,price });
    await newBebida.save();
    req.flash('success_msg', 'Bebida agregada con exito');
    res.redirect('/Bebidas');
  }
});

// Todas las bebidas
router.get('/bebidas',isAuthenticated,  async (req, res) => {
  const bebida = await Bebida.find().sort({date: 'desc'});
  res.render('Bebidas/Surtido', { bebida });
});

// Editar bebida

router.get('/Bebidas/edit/:id',isAuthenticated, async (req, res) => {
  const bebida = await Bebida.findById(req.params.id);
  if(Bebida.user != req.user) {
    req.flash('error_msg', 'Not Authorized');
    return res.render('/Bebidas');
  } 
  res.render('Bebidas/editar-Bebida', { bebida });
});

router.put('/Bebidas/editar-bebida/:id',isAuthenticated, async (req, res) => {
  const { name, price } = req.body;
  
  await Bebida.findByIdAndUpdate(req.params.id, {name, price});
  req.flash('success_msg', 'Bebida Actualizada con exito');
  res.redirect('/Bebidas');
});

// Eliminar bebida
router.delete('/Bebidas/delete/:id',isAuthenticated, async (req, res) => {
  await Bebida.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Bebida eliminada con exito');
  res.redirect('/Bebidas');
});

module.exports=router;