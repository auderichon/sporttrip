// require("dotenv").config();
// require("./../config/dbconfig");
// const ReviewModel = require("./../models/Reviews");

const ReviewsList = [
   {
      reviewedUser: "Mala", // Mala
      reviewerName: "Audrey", // Audrey
      reviewContent: "Good at Basketball but not swimming",
      rate: 2,
      reviewDate: "2020-07-01",
   },
   {
      reviewedUser: "Audrey", //Audrey
      reviewerName: "Mala", // Mala
      reviewContent: "She is a hater",
      rate: 0,
      reviewDate: "2020-07-10",
   },
];

module.exports = ReviewsList;

/* 
ReviewModel.create(ReviewsList)
   .then((dbRes) => console.log(dbRes))
   .catch((dbErr) => console.error(dbErr));
 */