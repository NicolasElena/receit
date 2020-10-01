import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('ingredients', (table) => {
    table.increments('id').primary();
    table.string('ingredient').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('ingredients');
}
