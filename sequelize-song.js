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
  class Album extends Model {}
  Album.init(
    {
      id: {
        type: Sequelize.INTEGER,
        //autoIncrement: true,
        primaryKey: true,
      },
      album_id: {
        type: Sequelize.INTEGER,
        //autoIncrement: true,
        // references: {
        //     model: artist,
        //     key: 'id',
        //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        // },
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      song_no: {
        type: Sequelize.INTEGER,
      },
      song_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "song",
      tableName: "song",
      timestamps: false,
    }
  );


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