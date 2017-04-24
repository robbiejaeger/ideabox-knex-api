
exports.seed = function(knex, Promise) {
  return knex('ideas').del()
    .then(function () {
      return knex('ideas').insert({
        title: 'First Idea!',
        body: "The body of the first idea",
        quality: 0
      });
    }).then(function(){
      return knex('ideas').insert({
        title: 'Second Idea!',
        body: "The body of the second idea",
        quality: 0
      })
    });
};
