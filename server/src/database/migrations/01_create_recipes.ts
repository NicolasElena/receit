import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('recipe').notNullable();
    table.integer('owner').notNullable().references('id').inTable('users');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('recipes');
}
