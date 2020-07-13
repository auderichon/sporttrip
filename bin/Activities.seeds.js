// require("dotenv").config();
// require("./../config/dbconfig");
// const ActivityModel = require("./../models/Activities");

const ActivitiesList = [
   {
      activityName: "Paris - Lyon by bike",
      date: "2020-01-01",
      location: {
         city: "Paris",
         country: "France",
      },
      sport: "Cycling", //cycling
      requiredLevel: "experienced",
      duration: "3 days",
      maxNbParticipants: 4,
      creator: "Aude", //Aude
      participants: [
         { participantID: "Mala" },
         { participantID: "Audrey" },
      ],
      description: "A very good trip !",
   },
   {
      activityName: "Climbing over Interlaken",
      date: "2020-01-30",
      location: {
         city: "Interlaken",
         country: "Switzerland",
      },
      sport: "Climbing", //climbing
      requiredLevel: "all",
      duration: "1/2 day",
      maxNbParticipants: 4,
      creator: "Mala", //Mala
      participants: [
         { participantID: "Aude" },
         { participantID: "Audrey" },
      ],
      description: "Perfect trip",
   },
   {
      activityName: "Sailing in Corsica",
      date: "2020-07-23",
      location: {
         city: "Bastia",
         country: "France",
      },
      sport: "Sailing", //sailing
      requiredLevel: "intermediate",
      duration: "full day",
      maxNbParticipants: 6,
      creator: "Audrey", //Audrey
      participants: [{ participantID: "Mala" }, { participantID: "Aude" }],
      description: "Cool spot !!!",
   },
];

module.exports = ActivitiesList;

/* 
ActivityModel.create(ActivitiesList)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.error(dbErr));
 */
