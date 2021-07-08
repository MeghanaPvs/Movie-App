const express = require('express');

const mongoose = require('mongoose');
const {Genre, validate} = require('../models/genre');

const router = express.Router();
const Joi = require('joi');


//genres array
//this is stored in physical memeory
// const genres = [
//     { id: 1, name: 'Action Movies' },  
//     { id: 2, name: 'Horror Movies' },  
//     { id: 3, name: 'Comedy Movies' },  
//   ];

//REPLACING GENRES ARRAY BY DEFINING SCHEMA 

const genreSchema = new mongoose.Schema({
   name:{
     type: String,
     required:true,
     minlength:5,
     maxlength:50
   }
});

//Now Create model to that schema:

const Genre = mongoose.model('Genre',genreSchema);
//OR
// const Genre = mongoose.model('Genre', new mongoose.schema({
//   name:{
//     type: String,
//     required:true,
//     minlength:5,
//     maxlength:50
//  }
// }));


// To get all genres

router.get('/', async(req, res) => {
    const genres= await Genre.find().sort('name');
    res.send(genres);
  });
  
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let genre = new Genre({
      // id :genres.length + 1,
      name: req.body.name
    }); 
    // genres.push(genre);
    //Instead of pushing save it to the database.
     await genre.save();
    res.send(genre);
  });
  
  //To Update a particular id
  //localhost:3000/api/genres/1    { "name": "Drama Movies"}  ==> Now id=1 is updated with Drama Movies


    router.put('/:id', async(req, res) => {
        const { error } = validateGenre(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
        
        const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    });
    if (!genre) return res.status(404).send('The genre with the given ID was not found.'); 
    res.send(genre);
  });
  
  
  //DELETE REQUEST
  //localhost:3000/api/genres/2  ==>Send the id of the movie to delete particular movie
  
  router.delete('/:id', async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    // const index = genres.indexOf(genre); //USED FOR ARRAYS 
    // genres.splice(index, 1);
    res.send(genre);
  });
  
  
  //To get a particular genre
  
  router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  });
  
  function validateGenre(genre) {
    const schema= {
      name: Joi.string().min(3).required()
  };
  
    return Joi.validate(genre,schema);
  }

  module.exports = router;