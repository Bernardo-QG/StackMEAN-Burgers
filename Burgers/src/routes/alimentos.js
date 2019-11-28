const express = require('express');
const router=express.Router();
const Alimento = require('../models/Alimento');// agrgarr archibo .js de alimento en models 

const { isAuthenticated } = require('../helpers/auth');

// Nuevo alimento 
router.get('/Alimentos/add', isAuthenticated, (req, res) => {
  res.render('Alimentos/alimento-nuevo');
});

router.post('/Alimentos/alimento-nuevo', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;// cambiar todo el cuerpo 
  const errors = [];
  if (!title) {
    errors.push({text: 'Ingresa un nombre'});
  }
  if (!description) {
    errors.push({text: 'Ingresa los ingredientes'});
  }
  if (errors.length > 0) {
    res.render('Alimentos/alimento-nuevo', {// cambair el curtpo de lo que pide ejemplo ingredientes nombre y precio
      errors,
      title,
      description
    });
  } else {
    const newAlimento = new Alimento({title, description});// cambair a sus caracteristicas 
    newAlimento.user = req.user.id;
    await newAlimento.save();
    req.flash('success_msg', 'Alimento agregado con exito');
    res.redirect('/Alimentos');
  }
});

// Get All Notes
router.get('/Alimentos', isAuthenticated, async (req, res) => {
  const alimento = await Alimento.find({user: req.user.id}).sort({date: 'desc'});
  res.render('Alimentos/Surtido', { alimento });
});

// Edit Notes
router.get('/Alimentos/edit/:id', isAuthenticated, async (req, res) => {
  const alimento = await Alimento.findById(req.params.id);
  if(alimento.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/Alimentos');
  } 
  res.render('Alimentos/editar-Alimento', { alimento });
});

router.put('/Alimentos/editar-Alimento/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;//cambiar cuerpo
  await Alimento.findByIdAndUpdate(req.params.id, {title, description});//cambiar cuerpo
  req.flash('success_msg', 'Alimento Actualizado con exito');
  res.redirect('/Alimentos');
});

// Delete Notes
router.delete('/Alimentos/eliminar/:id', isAuthenticated, async (req, res) => {
  await Alimento.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Alimento eliminado con exito');
  res.redirect('/Alimentos');
});



module.exports=router;