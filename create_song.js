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

prompt('Track name? ')
    .then(function nameResponse(val) {
        result.push(val);
        return prompt('Album ID? ');
    })
    .then(function durationResponse(val) {
        result.push(val);
        return prompt('Track Duration? ');
    })
    .then(function songnoResponse(val) {
        result.push(val);
        return prompt('Song number on album? ');
    })
    .then(function finishResponse(val) {
        result.push(val);
        prompt.done();
        console.log(result);
        db.result(
            `INSERT INTO song (id, song_name, album_id, duration, song_no) VALUES (DEFAULT, '${result[0]}', ${result[1]}, ${result[2]}, ${result[3]}) RETURNING id`
        )
            .then((result) => {
                // console.log(result);
                console.log(`Created song with ID ${result.rows[0].id}`);
            })
            .catch((e) => {
                console.log(e);
            });
    })
    .catch(function rejected(err) {
        console.log('error:', err.stack);
        prompt.finish();
    });