require('dotenv').config(); // MUST be first

const pgp = require('pg-promise')();
const db = pgp({
    // production: PG_HOST=db, development: PG_HOST=localhost
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

module.exports = db;