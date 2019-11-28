const express = require('express');
const router=express.Router();
//const Bebida = require('../models/Bebida');

const { isAuthenticated } = require('../helpers/auth');

// Nueva bebid
router.get('/Bebidas/agregar', isAuthenticated, (req, res) => {
  res.render('Bebidas/bebida-nueva');
});

router.post('/Bebidas/bebida-nueva', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;// cambiar todo el cuerpo 
  const errors = [];
  if (!title) {
    errors.push({text: 'Ingresa un nombre'});
  }
  if (!description) {
    errors.push({text: 'Ingresa el sabor'});
  }
  if (errors.length > 0) {
    res.render('Bebidas/bebida-nueva', {// cambair el curtpo de lo que pide ejemplo ingredientes nombre y precio
      errors,
      title,
      description
    });
  } else {
    const newBebida = new Bebida({title, description});// cambair a sus caracteristicas 
    newBebida.user = req.user.id;
    await newBebida.save();
    req.flash('success_msg', 'Bebida agregado con exito');
    res.redirect('/Bebidas');
  }
});

// Get All Notes
router.get('/Bebidas', isAuthenticated, async (req, res) => {
  const bebida = await Bebida.find({user: req.user.id}).sort({date: 'desc'});
  res.render('Bebidas/Surtido', { bebida });
});

// Edit Notes
router.get('/Bebidas/edit/:id', isAuthenticated, async (req, res) => {
  const bebida = await Bebida.findById(req.params.id);
  if(bebida.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/Bebidas');
  } 
  res.render('Bebidas/editar-Bebida', { bebida });
});

router.put('/Bebidas/editar-Bebida/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;//cambiar cuerpo
  await Bebida.findByIdAndUpdate(req.params.id, {title, description});//cambiar cuerpo
  req.flash('success_msg', 'Bebida Actualizada con exito');
  res.redirect('/Bebidas');
});

// Delete Notes
router.delete('/Bebidass/eliminar/:id', isAuthenticated, async (req, res) => {
  await Bebida.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Bebida eliminada con exito');
  res.redirect('/Bebidas');
});


module.exports=router;