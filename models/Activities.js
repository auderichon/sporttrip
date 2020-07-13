const mongoose = require("mongoose"); // import mongoose dependency
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  activityName: String,
  date: Date,
  location: {
    city: String,
    country: String,
  },
  sport: {
    type: Schema.Types.ObjectId,
    ref: "sport",
  },
  requiredLevel: [
    {
      type: String,
      enum: ["all", "beginner", "intermediate", "experienced", "professional"],
    },
  ],
  duration: {
    type: String,
    enum: [
      "1/2 day",
      "full day",
      "2 days",
      "3 days",
      "4 to 6 days",
      "1 week",
      "> 1 week",
    ],
  },
  maxNbParticipants: Number,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  participants: [
    {
      participantID: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  description: String,
});

const ActivityModel = mongoose.model("activity", ActivitySchema);
module.exports = ActivityModel;
