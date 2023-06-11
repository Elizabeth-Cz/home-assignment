const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'masterliz',
  host: 'localhost',
  port: 5432,
  database: 'fourindustry',
});

module.exports = pool;
