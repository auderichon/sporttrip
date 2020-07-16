const mongoose = require("mongoose"); // import mongoose dependency
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  messages: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      content: String,
      date: Date,
    },
  ],
});
const conversationModel = mongoose.model("message", conversationSchema);
module.exports = conversationModel;
