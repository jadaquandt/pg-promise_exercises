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
    //    console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  const Model = Sequelize.Model;
  class Album extends Model {}
  Album.init(
    {
      id: {
        type: Sequelize.INTEGER,
        //autoIncrement: true,
        primaryKey: true,
      },
      artist_id: {
        type: Sequelize.INTEGER,
        //autoIncrement: true,
        // references: {
        //     model: artist,
        //     key: 'id',
        //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        // },
      },
      release_year: {
        type: Sequelize.INTEGER,
      },
      album_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "album",
      tableName: "album",
      timestamps: false,
    }
  );


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