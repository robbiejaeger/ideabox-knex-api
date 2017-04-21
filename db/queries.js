var knex = require('./knex.js');

function Ideas() {
  return knex('ideas');
}

// *** queries *** //

function getAll() {
  return Ideas().select();
}


module.exports = {
  getAll: getAll
};
