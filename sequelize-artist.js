const config = {
  host: 'localhost',
  port: 5432,
  database: 'albums_db',
  user: 'postgres'
};

const Sequelize = require("sequelize");
const prompt = require("prompt-promise");
const pgp = require('pg-promise')();
const db = pgp(config);
var result = [];
// Option 1: Passing parameters separately
const sequelize = new Sequelize("albums_db", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    // console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
const Model = Sequelize.Model;
class Artist extends Model {}
Artist.init(
  {
    id: {
      type: Sequelize.INTEGER,
      //autoIncrement: true,
      primaryKey: true,
    },
    artist_name: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
  },
  {
    sequelize,
    modelName: "artist",
    tableName: "artist",
    timestamps: false,
  }
);

prompt('Artist name? ')
    .then(function nameResponse(val) {
        result.push(val);
        prompt.done();
        // console.log(result);
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

// Artist.findAll().then((results) => {
//   results.forEach(function (index) {
//     console.log(index.id, index.artist_name);
//   });
// });
