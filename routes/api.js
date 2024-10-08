/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: [String],
  commentcount: { type: Number, default: 0}
});

const Book = mongoose.model('Book', bookSchema);

const addBook = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.json('missing required field title')
  } else {
    const newBook = new Book({ title: title });
    newBook.save();
    res.json(newBook);
    console.log(newBook);
  }
};

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(addBook)
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
