
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Wordofday').del()
    .then(function () {
      // Inserts seed entries
      return knex('Wordofday').insert([
        {id: 1, pajuba: 1, date: '2020-08-01'},
        {id: 2, pajuba: 2, date: '2020-08-02'},
        {id: 3, pajuba: 3, date: '2020-08-03'},
      ]);
    });
};
