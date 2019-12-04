const express = require('express');
const router=express.Router();
const Alimento = require('../models/Alimento');

//nuevo alimento
router.get('/Alimentos', async (req, res) => {
  const alimento = await Alimento.find().sort({date: 'desc'});
  res.render('alimentos/Surtido',{alimento});
});

router.get('/Alimentos/add', (req, res) => {
  res.render('alimentos/alimento-nuevo');
});

router.post('/Alimentos/alimento-nuevo', (req, res) => {
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
    newAlimento.save();
    req.flash('success_msg', 'Alimento agregado con exito');
    res.redirect('/Alimentos');
  }
});

// Todos los alimentos 
router.get('/Alimentos',  async (req, res) => {
  const alimento = await Alimento.find().sort({date: 'desc'});
  res.render('Alimentos/Surtido', { alimento });
});

// Editar alimento

router.get('/Alimentos/edit/:id', async (req, res) => {
  const alimento = await Alimento.findById(req.params.id);
  if(Alimento.user != req.user) {
    req.flash('error_msg', 'Not Authorized');
    return res.render('/Alimentos');
  } 
  res.render('Alimentos/editar-Alimento', { alimento });
});

router.put('/Alimentos/editar-Alimento/:id', async (req, res) => {
  const { name, ingredients, price } = req.body;
  await Alimento.findByIdAndUpdate(req.params.id, {name, ingredients, price});
  req.flash('success_msg', 'Alimento Actualizado con exito');
  res.redirect('/Alimentos');
});

// Eliminar Alimento 
router.delete('/Alimentos/delete/:id', async (req, res) => {
  await Alimento.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Alimento eliminado con exito');
  res.redirect('/Alimentos');
});

module.exports=router;