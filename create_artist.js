const config = {
    host: 'localhost',
    port: 5432,
    database: 'albums_db',
    user: 'postgres'
};

const pgp = require('pg-promise')();
const db = pgp(config);
const prompt = require('prompt-promise');
var result = [];

prompt('Artist name? ')
    .then(function nameResponse(val) {
        result.push(val);
        prompt.done();
        console.log(result);
        db.result(`INSERT INTO artist (id, artist_name) VALUES (DEFAULT, '${result[0]}')  RETURNING id`)
            .then((result) => {
            // console.log(result);
            console.log(`Created artist with ID ${result.rows[0].id}`);
        })
            .catch((e) => {
                console.log(e);
            });
    })
    .catch(function rejected(err) {
        console.log('error:', err.stack);
        prompt.finish();
    });
