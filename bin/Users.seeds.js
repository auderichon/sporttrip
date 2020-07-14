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
        sport: "Cycling",
        level: "intermediate",
      },
      {
        sport: "Running / Trail",
        level: "professional",
      },
    ],
    birthday: "1980-07-28",
    stravaLink: "https://www.strava.com/athletes/18651642",
  },
  {
    firstName: "Mala",
    lastName: "Mine",
    email: "bar@foo.baz",
    password: "1234",
    sports: [
      {
        sport: "Swimming / Diving",
        level: "intermediate",
      },
    ],
    birthday: "1980-01-08",
    stravaLink: "https://www.strava.com/athletes/18091642",
  },
  {
    firstName: "Audrey",
    lastName: "Bel",
    email: "baz@bar.foo",
    password: "1234",
    sports: [
      {
        sport: "Sailing",
        level: "beginner",
      },
    ],
    birthday: "1990-01-01",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "yo@foo.baz",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594759247/user-pictures/Capture_d_e%CC%81cran_2020-07-14_a%CC%80_22.39.32_d1kdi4.png",
    password: "5678",
    sports: [
      {
        sport: "Swimming / Diving",
        level: "experienced",
      },
      {
        sport: "Running / Trail",
        level: "experienced",
      },
      {
        sport: "Triathlon",
        level: "experienced",
      },
    ],
    birthday: "1985-10-05",
    stravaLink: "https://www.strava.com/athletes/16391642",
  },
  {
    firstName: "Ella",
    lastName: "Johnson",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594759247/user-pictures/Capture_d_e%CC%81cran_2020-07-14_a%CC%80_22.39.50_hmzpro.png",
    email: "ella@foo.baz",
    password: "5678",
    sports: [
      {
        sport: "Nordic walking",
        level: "intermediate",
      },
    ],
    birthday: "1985-08-10",
  },
  {
    firstName: "Marc",
    lastName: "North",
    picture:
      "https://res.cloudinary.com/sport-trip/image/upload/v1594759247/user-pictures/Capture_d_e%CC%81cran_2020-07-14_a%CC%80_22.40.03_esvcxb.png",
    email: "marc@foo.baz",
    password: "5678",
    sports: [
      {
        sport: "Swimming / Diving",
        level: "beginner",
      },
    ],
    birthday: "1991-11-23",
  },
];

module.exports = UsersList;

/* 
UserModel.create(UsersList)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.error(dbErr));
 */
