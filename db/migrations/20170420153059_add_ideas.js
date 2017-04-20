
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ideas', function(table){
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('body').notNullable()
    table.integer('quality').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ideas')
};
