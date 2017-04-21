var express = require('express')
var router = express.Router()

var queries = require('./db/queries')

router.get('/ideas', function(req, res, next){
  queries.getAll()
  .then(function(ideas){
    res.status(200).json(ideas)
  })
  .catch(function(error){
    next(error)
  })
})

module.exports = router
