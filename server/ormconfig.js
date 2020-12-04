module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ['dist/model/**/*.js'],
  migrations: ['dist/database/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/model',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/subscriber',
  },
};
