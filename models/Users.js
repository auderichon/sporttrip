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
            enum: ["beginner", "intermediate", "experienced", "pro"],
            required: true,
         },
      },
   ],
   createdActivities: {
      type: Schema.Types.ObjectId,
      ref: "activities", // TODO: VERIFY COLLECTION NAME
      // default: "User has not created an activity yet",
   },
   activitiesParticipation: {
      type: Schema.Types.ObjectId,
      ref: "activities", // TODO: VERIFY COLLECTION NAME
      // default: "User has not participated in an activity yet",
   },
   reviews: {
      type: Schema.Types.ObjectId,
      ref: "reviews",
      // default: "No reviews yet",
   },
   picture: {
      type: String,
      default: "https://cdn.onlinewebfonts.com/svg/img_258083.png",
   },
   birthday: Date,
   stravaLink: String,
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
