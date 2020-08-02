
exports.up = function (knex) {
  return knex.schema.createTable('Pajuba', function (table) {
    table.increments('id');
    table.string('expression', 1000).notNullable();
    table.string('description', 4000).notNullable();
    table.string('region', 100);
    table.string('usage', 4000);

    table.unique('expression');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('Pajuba');
};
