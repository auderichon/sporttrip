// require("dotenv").config();
// require("./../config/dbconfig");
// const sportModel = require("./../models/Sports");

const sportsList = [
  {
    name: "Cycling",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594537872/sports/cycling_wrdrcx.jpg",
  },
  {
    name: "Running / Trail",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594537872/sports/running-trail_imylvh.jpg",
  },
  {
    name: "Swimming / Diving",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594537871/sports/diving_gzbpkq.jpg",
  },
  {
    name: "Sailing",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594537878/sports/sailing_l9a3c4.jpg",
  },
  {
    name: "Skiing / Snowboarding",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594537872/sports/skiing_lkkuor.jpg",
  },
  {
    name: "Climbing",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594537873/sports/climbing_lfjnv8.jpg",
  },
  {
    name: "Triathlon",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594538520/sports/triathlon_rah3rn.jpg",
  },
  {
    name: "Hiking",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594537872/sports/hiking_c83jwc.jpg",
  },
  {
    name: "Nordic walking",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594537870/sports/nordic-walking_v1rv2h.jpg",
  },
  {
    name: "Canoeing / Kayaking",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594537872/sports/canoeing_zuubgl.jpg",
  },
];

module.exports = sportsList ;

/* 
sportModel
  .create(sportsList)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.error(dbErr));
 */