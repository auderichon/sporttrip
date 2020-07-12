require("dotenv").config();
require("./../config/dbconfig");
const UserModel = require("./../models/Users");

const UsersList = [
   {
      id: 1,
      firstName: "Aude",
      lastName: "Rich",
      email: "foo@bar.baz",
      password: "1234",
      sports: [
         {
            sport: "5f0aeecdc62ed51ba87a6f68", // Cycling
            level: "intermediate",
         },
         {
            sport: "5f0aeecdc62ed51ba87a6f69", // Running
            level: "pro",
         },
      ],
      birthday: "1980-01-01",
      stravaLink: "https://www.strava.com",
   },
   {
      id: 2,
      firstName: "Mala",
      lastName: "Mine",
      email: "foo@bar.baz",
      password: "1234",
      sports: {
         sport: "5f0aeecdc62ed51ba87a6f6a", // Swimming
         level: "intermediate",
      },

      birthday: "1980-01-01",
      stravaLink: "https://www.strava.com",
   },
   {
      id: 3,
      firstName: "Audrey",
      lastName: "Bel",
      email: "foo@bar.baz",
      password: "1234",
      sports: {
         sport: "5f0aeecdc62ed51ba87a6f6b", // Sailing
         level: "beginner",
      },
      birthday: "1980-01-01",
      stravaLink: "https://www.strava.com",
   },
];

UserModel.create(UsersList)
   .then((dbRes) => console.log(dbRes))
   .catch((dbErr) => console.error(dbErr));
