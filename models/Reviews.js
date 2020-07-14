const mongoose = require("mongoose"); // import mongoose dependency
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  reviewedUser: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  reviewerName: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  reviewContent: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    required: true,
  },
  reviewDate: Date,
});

const ReviewModel = mongoose.model("review", ReviewSchema);
module.exports = ReviewModel;
