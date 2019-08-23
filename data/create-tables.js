require('dotenv').config();

const pg = require('pg');
const Client = pg.Client;

const client = new Client(process.env.DATABASE_URL);

client.connect()
    .then(() => {   
        return client.query(`
            CREATE TABLE horror (
                id SERIAL PRIMARY KEY NOT NULL,
                title VARCHAR(256) NOT NULL,
                summary TEXT NOT NULL,
                worth_watch BOOLEAN NOT NULL,
                release_year INTEGER NOT NULL,
                director VARCHAR(256) NOT NULL,
                url VARCHAR(256) NOT NULL
            );
    `);
    })
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });