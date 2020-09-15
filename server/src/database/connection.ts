import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    database: 'receit_bd',
    user: 'postgres',
    password: 'N!cobd',
  },
});

export default connection;
