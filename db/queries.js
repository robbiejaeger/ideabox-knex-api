var knex = require('./knex.js');

function Ideas() {
  return knex('ideas');
}

// *** queries *** //

function getAll(){
  return Ideas().select();
}

function getSingle(ideaID){
  return Ideas().where('id', parseInt(ideaID)).first()
}

function add(idea){
  return Ideas().insert(idea, 'id')
}


module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  add: add
};
