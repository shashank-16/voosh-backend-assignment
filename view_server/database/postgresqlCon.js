
const promise = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: promise
});

const connectionString = 'postgres://postgres:mummy@localhost:5432/vooshMusicDB';
const db = pgp(connectionString);

module.exports = { db };