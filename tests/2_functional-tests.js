/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {
    let bookId = '';
    suite('POST /api/books with title => create book object/expect book object', () => {
      
      test('Test POST /api/books with title', (done) => {
        chai
          .request(server)
          .post('/api/books')
          .send({ title: 'The Alchemist '})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'Response should be an object');
            assert.property(res.body, 'commentcount', 'Book should contain commentcount');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            bookId = res.body._id;
            done();
          });
      });
      
    suite('GET /api/books => array of books', () => {
      
      test('Test GET /api/books',  (done) => {
        chai
          .request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'Response should be an array');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', () => {
      
      test('Test GET /api/books/[id] with id not in db',  (done) => {
        chai
          .request(server)
          .get('/api/books/6705735a4577ffd6b4de7abc')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'Response should be a string');
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
          .request(server)
          .get(`/api/books/${bookId}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'Response should be an object');
            assert.property(res.body, '_id', 'Book should contain _id');
            assert.property(res.body, 'comments', 'Book should contain comments');
            done();
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', () => {
      
      test('Test POST /api/books/[id] with comment', (done) => {
        chai
          .request(server)
          .post(`/api/books/${bookId}`)
          .send({ comment: 'very interesting' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'Response should be an object');
            assert.property(res.body, 'title', 'Response should contain title');
            assert.property(res.body, '_id', 'Response should include _id');
            assert.property(res.body, 'comments', 'Response should include comments');
            assert.isArray(res.body.comments, 'Comments should be an array');
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai
          .request(server)
          .post(`/api/books/${bookId}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'Response should be a string');
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai
          .request(server)
          .post('/api/books/6705735a4577ffd6b4de7abc')
          .send({ comment: 'my favorite book' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'Response should be a string');
            done();
          });
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', () => {

      test('Test DELETE /api/books/[id] with valid id in db', (done) => {
        chai
          .request(server)
          .delete(`/api/books/${bookId}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'Response should be a string');
            done();
          })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
          .request(server)
          .delete('/api/books/6705735a4577ffd6b4de7abc')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'Response should be a string');
            done();
          });
        });
      });
    });
  });
}); 
