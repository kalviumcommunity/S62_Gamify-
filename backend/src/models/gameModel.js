const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema({
  name: String,
  genre: String,
  description: String,
  image: String,
});

const GameModel = mongoose.model("Game", GameSchema);
module.exports = GameModel;
