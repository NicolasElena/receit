import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('measures').insert([
    { measure: 'g' },
    { measure: 'kg' },
    { measure: 'ml' },
    { measure: 'L' },
    { measure: 'xícara(s) de chá' },
    { measure: 'colher(es) de sopa' },
    { measure: 'colher(es) de sobremesa' },
    { measure: 'colher(es) de chá' },
    { measure: 'colher(es) de café' },
    { measure: 'copo americano' },
  ]);
}
