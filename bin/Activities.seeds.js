require("dotenv").config();
require("./../config/dbconfig");
const ActivityModel = require("./../models/Activities");

const ActivitiesList = [
  {
    activityName: "Paris - Lyon by bike",
    date: {
      day: "14-07-2020",
      time: "08h00",
    },
    location: {
      city: "Paris",
      country: "France",
    },
    sport: "5f0b176e47a176db5cab24d9", //cycling
    requiredLevel: "experienced",
    duration: "3 days",
    maxNbParticipants: 4,
    creator: "5f0b1718e31b59db36747bf6", //Aude
  },
  {
    activityName: "Climbing over Interlaken",
    date: {
      day: "27-07-2020",
      time: "14h00",
    },
    location: {
      city: "Interlaken",
      country: "Switzerland",
    },
    sport: "5f0b176e47a176db5cab24de", //climbing
    requiredLevel: "all",
    duration: "1/2 day",
    maxNbParticipants: 4,
    creator: "5f0b1718e31b59db36747bf9", //Mala
  },
  {
    activityName: "Sailing in Corsica",
    date: {
      day: "20-08-2020",
      time: "09h00",
    },
    location: {
      city: "Bastia",
      country: "France",
    },
    sport: "5f0b176e47a176db5cab24dc", //sailing
    requiredLevel: "intermediate",
    duration: "full day",
    maxNbParticipants: 6,
    creator: "5f0b1718e31b59db36747bfb", //Audrey
  },
];

ActivityModel.create(ActivitiesList)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.error(dbErr));
