const pgp = require('pg-promise');

const con = {
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "mummy",
    database: "vooshMusicDB"
};

const db = pgp(con);