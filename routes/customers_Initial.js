const express = require('express');

const mongoose = require('mongoose');
const {Customer, validate} = require('../models/customer'); 

const router = express.Router();
const Joi = require('joi');


//REPLACING GENRES ARRAY BY DEFINING SCHEMA 

// const genreSchema = new mongoose.Schema({
//    name:{
//      type: String,
//      required:true,
//      minlength:5,
//      maxlength:50
//    }
// });

//Now Create model to that schema:

//const Genre = mongoose.model('Genre',genreSchema);
//OR
const Customer = mongoose.model('Customer', new mongoose.schema({
  name:{
    type: String,
    required:true,
    minlength:5,
    maxlength:50
 },
 isGold:{
     type:Boolean,
     default:false
 },
 phone:{
    type: String,
    required:true,
    minlength:10
 }

}));


// To get all customers

router.get('/', async(req, res) => {
    const customers= await Customer.find().sort('name');
    res.send(customers);
  });
  
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new Customer({
      name: req.body.name,
      phone:req.body.phone,
      isGold:req.body.isGold
    }); 
     await customer.save();
    res.send(customer);
  });


router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }, { new: true });
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(customer);
  });
  
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(customer);
  });
  

  router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(customer);
  });



function validateCustomer(customer) {
    const schema= {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold:Joi.boolean()
  };
  
    return Joi.validate(customer,schema);
  }
  module.exports=router;