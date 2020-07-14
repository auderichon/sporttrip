// require("dotenv").config();
// require("./../config/dbconfig");
// const UserModel = require("./../models/Users");

const UsersList = [
  {
    firstName: "Aude",
    lastName: "Rich",
    email: "foo@bar.baz",
    password: "1234",
    sports: [
      {
        sport: "Cycling", // Cycling
        level: "intermediate",
      },
      {
        sport: "Running / Trail", // Running
        level: "professional",
      },
    ],
    birthday: "1980-01-01",
    stravaLink: "https://www.strava.com",
  },
  {
    firstName: "Mala",
    lastName: "Mine",
    email: "bar@foo.baz",
    password: "1234",
    sports: [{
      sport: "Swimming / Diving", // Swimming
      level: "intermediate",
    }],
    birthday: "1980-01-01",
    stravaLink: "https://www.strava.com",
  },
  {
    firstName: "Audrey",
    lastName: "Bel",
    email: "baz@bar.foo",
    password: "1234",
    sports: [{
      sport: "Sailing", // Sailing
      level: "beginner",
    }],
    birthday: "1980-01-01",
    stravaLink: "https://www.strava.com",
  },
];

module.exports = UsersList ;

/* 
UserModel.create(UsersList)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.error(dbErr));
 */