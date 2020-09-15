import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('ingredients').notNullable();
    table.string('preparemethod').notNullable();
    table.string('owner').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('recipes');
}
