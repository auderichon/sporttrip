require("dotenv").config();
require("./../config/dbconfig");
const ReviewModel = require("./../models/Reviews");

const ReviewsList = [
   {
      reviewedUser: "5f0b132557a2d738a2fbc551", // Mala
      reviewerName: "5f0b132557a2d738a2fbc553", // Audrey
      reviewContent: "Good at Basketball but not swimming",
      rate: 2,
      reviewDate: 2020 - 07 - 02,
   },
   {
      reviewedUser: "5f0b132557a2d738a2fbc553", //Audrey
      reviewerName: "5f0b132557a2d738a2fbc551", // Mala
      reviewContent: "She is a hater",
      rate: 0,
      reviewDate: 2020 - 07 - 10,
   },
];

ReviewModel.create(ReviewsList)
   .then((dbRes) => console.log(dbRes))
   .catch((dbErr) => console.error(dbErr));
