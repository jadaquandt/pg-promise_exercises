const Sequelize = require("sequelize");
const prompt = require("prompt-promise");
var result = [];
// Option 1: Passing parameters separately
const sequelize = new Sequelize("music_database", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
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

Artist.findAll().then((results) => {
  results.forEach(function (index) {
    console.log(index.id, index.artist_name);
  });
});
