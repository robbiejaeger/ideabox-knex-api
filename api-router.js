var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var queries = require('./db/queries')

router.use(bodyParser.json())

router.get('/ideas', function(req, res, next){
  queries.getAll()
  .then(function(ideas){
    res.status(200).json(ideas)
  })
  .catch(function(error){
    next(error)
  })
})

router.get('/ideas/:id', function(req, res, next){
  queries.getSingle(req.params.id)
  .then(function(idea){
    res.status(200).json(idea)
  })
  .catch(function(error){
    next(error)
  })
})

router.post('/ideas', function(req, res, next){
  queries.add(req.body)
  .then(function(ideaID){
    return queries.getSingle(ideaID)
  })
  .then(function(idea){
    res.status(200).json(idea)
  })
  .catch(function(error){
    next(error)
  })
})

module.exports = router
