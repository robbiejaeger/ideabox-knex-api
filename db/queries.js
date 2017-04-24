var knex = require('./knex.js');

function Ideas() {
  return knex('ideas');
}

// *** queries *** //

function getAll() {
  return Ideas().select();
}

function getSingle(ideaID) {
  return Ideas().where('id', parseInt(ideaID)).first()
}


module.exports = {
  getAll: getAll,
  getSingle: getSingle
};
