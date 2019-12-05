const express = require('express');
const router=express.Router();
const Alimento = require('../models/Alimento');
const {isAuthenticated} = require('../helpers/auth');


//nuevo alimento
router.get('/Alimentos', isAuthenticated,async (req, res) => {
  const alimento = await Alimento.find().sort({date: 'desc'});
  res.render('alimentos/Surtido',{alimento});
});

router.get('/Alimentos/add', isAuthenticated,(req, res) => {
  res.render('alimentos/alimento-nuevo');
});

router.post('/Alimentos/alimento-nuevo',isAuthenticated, async (req, res) => {
  const { name, ingredients, price} = req.body; 
  
  const errors = [];
  if (!name)   errors.push({text: 'Ingresa un nombre'});
  if (!ingredients)   errors.push({text: 'Ingresa ingredientes'});
  if (!price)   errors.push({text: 'Ingresa un precio'});

  if (errors.length > 0) {
    res.render('alimentos/alimento-nuevo', {
      errors, name, ingredients,price
    });
  } else {
    
    const newAlimento = new Alimento({name, ingredients,price });
    await newAlimento.save();
    req.flash('success_msg', 'Alimento agregado con exito');
    res.redirect('/Alimentos');
  }
});

// Todos los alimentos 
router.get('/Alimentos', isAuthenticated, async (req, res) => {
  const alimento = await Alimento.find().sort({date: 'desc'});
  res.render('Alimentos/Surtido', { alimento });
});

// Editar alimento


router.get('/Alimentos/edit/:id', isAuthenticated, async (req, res) => {
  const alimento = await Alimento.findById(req.params.id);
  res.render('Alimentos/editar-Alimento', { alimento });
});

router.put('/Alimentos/editar-Alimento/:id', isAuthenticated, async (req, res) => {
  const { name, ingredients, price } = req.body;
  await Alimento.findByIdAndUpdate(req.params.id, {name, ingredients, price});
  req.flash('success_msg', 'Alimento Actualizado con exito');
  res.redirect('/Alimentos');
});

// Eliminar Alimento 
router.delete('/Alimentos/delete/:id', isAuthenticated, async (req, res) => {
  await Alimento.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Alimento eliminado con exito');
  res.redirect('/Alimentos');
});

module.exports=router;