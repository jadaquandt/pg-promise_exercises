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

prompt('Album name? ')
    .then(function nameResponse(val) {
        result.push(val);
        return prompt('Album year? ');
    })
    .then(function yearResponse(val) {
        result.push(val);
        return prompt('Artist ID? ');
    })
    .then(function artistIDResponse(val) {
        result.push(val);
        prompt.done();
        console.log(result);
        db.result(
            `INSERT INTO album (id, album_name, release_year, artist_id) VALUES (DEFAULT, '${result[0]}',${result[1]}, ${result[2]}) RETURNING id`
        )
            .then((result) => {
                // console.log(result);
                console.log(`Created album with ID ${result.rows[0].id}`);
            })
            .catch((e) => {
                console.log(e);
            });
    })
    .catch(function rejected(err) {
        console.log('error:', err.stack);
        prompt.finish();
    });
