
exports.up = function (knex) {
    return knex.schema.createTable('Wordofday', function (table) {
        table.increments('id');
        table.integer('pajuba').notNullable();
        table.date('date').notNullable();

        table.unique('date');

        table.foreign('pajuba')
            .references('id')
            .inTable('Pajuba')
            ;
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('Wordofday');
};
