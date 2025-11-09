require('dotenv').config(); // MUST be first

const pgp = require('pg-promise')();
// production: PG_HOST=db, development: PG_HOST=localhost
const db = pgp({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

module.exports = db;