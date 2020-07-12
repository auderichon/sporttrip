const mongoose = require("mongoose"); // import mongoose dependency
const Schema = mongoose.Schema;

const SportSchema = new Schema({
  name: String,
  picture: String,
});

const SportModel = mongoose.model("sport", SportSchema);
module.exports = SportModel;
