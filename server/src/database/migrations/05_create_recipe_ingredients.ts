import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('recipe_ingredients', (table) => {
    table.increments('id').primary();
    table
      .integer('recipe_id')
      .notNullable()
      .references('id')
      .inTable('recipes');
    table
      .integer('ingredient_id')
      .notNullable()
      .references('id')
      .inTable('ingredients');
    table.integer('amount').notNullable();
    table
      .integer('measure_id')
      .notNullable()
      .references('id')
      .inTable('measures');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('ingredients');
}