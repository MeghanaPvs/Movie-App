// const Joi = require('joi');

// //const Joi = require('@hapi/joi')
// const express = require('express');
// const app = express();
// //const genres = require('./routes/genres');

// app.use(express.json());


// //genres array

// const genres = [
//   { id: 1, name: 'Action Movies' },  
//   { id: 2, name: 'Horror Movies' },  
//   { id: 3, name: 'Comedy Movies' },  
// ];

// // To get all genres

// app.get('/api/genres', (req, res) => {
//   res.send(genres);
// });

// app.post('/api/genres', (req, res) => {
//   const { error } = validateGenre(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = {
//     id: genres.length + 1,
//     name: req.body.name
//   }; 
//   genres.push(genre);
//   res.send(genre);
// });

// app.put('/api/genres/:id', (req, res) => {
//   const genre = genres.find(c => c.id === parseInt(req.params.id));
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   const { error } = validateGenre(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
  
//   genre.name = req.body.name; 
//   res.send(genre);
// });


// //DELETE REQUEST

// app.delete('/api/genres/:id', (req, res) => {
//   const genre = genres.find(c => c.id === parseInt(req.params.id));
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   const index = genres.indexOf(genre);
//   genres.splice(index, 1);

//   res.send(genre);
// });


// //To get a particular genre

// app.get('/api/genres/:id', (req, res) => {
//   const genre = genres.find(c => c.id === parseInt(req.params.id));
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//   res.send(genre);
// });

// function validateGenre(genre) {
//   const schema= {
//     name: Joi.string().min(3).required()
// };

//   return Joi.validate(genre,schema);
// }

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));


//const Joi = require('joi');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

//Connecting to MongoDb
// mongoose.connect('mongodb://localhost/vidly')
//         .then(()=> console.log('Connection Established Successfully'))
//         .catch(err=>console.error('Could not connect to MongoDb'));


// Db: genres ;; pswd: genres123 ;; Database name: MovieGenres ;; Collection name: Genres
//mongodb+srv://genres:genres123@cluster0.lghhp.mongodb.net/MovieGenres?retryWrites=true&w=majority


const uri = "mongodb+srv://genres:genres123@cluster0.lghhp.mongodb.net/MovieGenres?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers',customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));