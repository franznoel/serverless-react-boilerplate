const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_USER,
  DB_PORT,
} = process.env;

export const knexConfig = {
  client: 'pg',
  version: '12',
  connection: `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
};

function getKnexConfig() {
  return {
    development: {
      ...knexConfig,
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: path.join(__dirname, 'migrations'),
        tableName: 'knex_migrations',
        extension: 'ts',
      },
      seeds: {
        directory: path.join(__dirname, 'seeds'),
      },
    },
  }  
}

export default getKnexConfig();
