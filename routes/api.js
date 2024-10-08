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

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      const books = await Book.find({});
      res.json(books);
    })

    .post((req, res) => {
      const { title } = req.body;
    
      if (!title) {
        return res.json('missing required field title')
      } else {
        const newBook = new Book({ title: title });
        newBook.save();
        res.json(newBook);
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      const book = await Book.findById({ _id: req.params.id });
      if (!book) {
        return res.json('no book exists');
      } else {
        res.json({
          title: book.title,
          _id: req.params.id,
          comments: book.comments
        });
      }
    })
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        return res.json('missing required field comment');
      }
      try {
        const book = await Book.findById({ _id: bookid });
        book.comments.push(comment);
        await book.save();
        res.json({
          title: book.title,
          _id: bookid,
          comments: book.comments
        });
      } 
      catch {
        return res.json('no book exists')
      }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
