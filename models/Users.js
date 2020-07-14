const mongoose = require("mongoose"); // import mongoose dependency
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sports: [
    {
      sport: {
        type: Schema.Types.ObjectId,
        ref: "sport",
        required: true,
      },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "experienced", "professional"],
        required: true,
      },
    },
  ],
  picture: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/svg/img_258083.png",
  },
  birthday: Date,
  stravaLink: String,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
