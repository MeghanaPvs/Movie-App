const express = require('express');
const router = express.Router();
const Joi = require('joi');


//genres array

const genres = [
    { id: 1, name: 'Action Movies' },  
    { id: 2, name: 'Horror Movies' },  
    { id: 3, name: 'Comedy Movies' },  
  ];

  // To get all genres

router.get('/', (req, res) => {
    res.send(genres);
  });
  
router.post('/', (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = {
      id: genres.length + 1,
      name: req.body.name
    }; 
    genres.push(genre);
    res.send(genre);
  });
  
  //To Update a particular id
  //localhost:3000/api/genres/1    { "name": "Drama Movies"}  ==> Now id=1 is updated with Drama Movies


    router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name; 
    res.send(genre);
  });
  
  
  //DELETE REQUEST
  //localhost:3000/api/genres/2  ==>Send the id of the movie to delete particular movie 
  
  router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
  
    res.send(genre);
  });
  
  
  //To get a particular genre
  
  router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
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