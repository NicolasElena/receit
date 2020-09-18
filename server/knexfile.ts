module.exports = {
  client: 'pg',
  connection: {
    database: 'receit_bd',
    user: 'postgres',
    password: 'N!cobd',
  },
  migrations: {
    directory: `${__dirname}/src/database/migrations`,
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`,
  },
};
