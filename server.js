require ('dotenv').config();

// Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

// DB client
const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();

// App Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));

app.get('/api/horror', (req, res) => {
    client.query(`
        SELECT
            id,
            title,
            summary,
            worth_watch,
            release_year,
            director,
            url
        FROM HORROR
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});


app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});