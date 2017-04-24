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

function update(ideaID, updates){
  return Ideas().where('id', parseInt(ideaID)).update(updates)
}

function deleteItem(ideaID){
  return Ideas().where('id', parseInt(ideaID)).del()
}


module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  add: add,
  update: update,
  deleteItem: deleteItem
};
