import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('measures', (table) => {
    table.increments('id').primary();
    table.string('measure').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('measure');
}
