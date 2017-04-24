process.env.NODE_ENV = 'test'

var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var server = require('../server')
var knex = require('../db/knex');


chai.use(chaiHttp)

describe('API routes', function(){

  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('GET /api/v1/ideas', function(){
    it('should return all ideas', function(done){
      chai.request(server)
      .get('/api/v1/ideas')
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        res.body.length.should.equal(2)

        res.body[0].should.have.property('title')
        res.body[0].title.should.equal('First Idea!')
        res.body[0].should.have.property('body')
        res.body[0].body.should.equal('The body of the first idea')
        res.body[0].should.have.property('quality')
        res.body[0].quality.should.equal(0)

        res.body[1].should.have.property('title')
        res.body[1].title.should.equal('Second Idea!')
        res.body[1].should.have.property('body')
        res.body[1].body.should.equal('The body of the second idea')
        res.body[1].should.have.property('quality')
        res.body[1].quality.should.equal(0)
        done()
      })
    })
  })

  describe('GET /api/v1/ideas/:id', function(){
    it('should return a single idea', function(done){
      chai.request(server)
      .get('/api/v1/ideas/1')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.have.property('title')
        res.body.title.should.equal('First Idea!')
        res.body.should.have.property('body')
        res.body.body.should.equal('The body of the first idea')
        res.body.should.have.property('quality')
        res.body.quality.should.equal(0)
        done()
      })
    })
  })

  describe('POST /api/v1/ideas', function(){
    it('should add a new idea', function(done){
      chai.request(server)
      .post('/api/v1/ideas')
      .send({
        title: 'Posted Idea',
        body: 'The body of posted idea.',
        quality: 0
      })
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json
        res.should.be.a('object')
        res.body.should.have.property('title')
        res.body.title.should.equal('Posted Idea')
        res.body.should.have.property('body')
        res.body.body.should.equal('The body of posted idea.')
        res.body.should.have.property('quality')
        res.body.quality.should.equal(0)
        res.body.should.have.property('id')
        res.body.quality.should.equal(0)
        done()
      })
    })
  })
})
