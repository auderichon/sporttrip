// require("dotenv").config();
// require("./../config/dbconfig");
// const UserModel = require("./../models/Users");

const ActivitiesList = [
  {
    activityName: "Paris - Lyon by bike",
    date: "2020-06-01",
    location: {
      city: "Paris",
      country: "France",
    },
    sport: "Cycling",
    requiredLevel: ["experienced"],
    duration: "3 days",
    maxNbParticipants: 4,
    creator: "Aude",
    participants: [{ participantID: "Mala" }, { participantID: "Audrey" }],
    description:
      "Hey! I'm looking for a few other cyclists to join me. My only condition is that it is not your first and your used to that kind of trip.",
  },
  {
    activityName: "Climbing over Interlaken",
    date: "2019-08-30",
    location: {
      city: "Interlaken",
      country: "Switzerland",
    },
    sport: "Climbing",
    requiredLevel: ["all"],
    duration: "1/2 day",
    maxNbParticipants: 4,
    creator: "Mala",
    participants: [{ participantID: "Aude" }, { participantID: "Audrey" }],
    description: "Perfect trip, beautiful views !",
  },
  {
    activityName: "Sailing in Corsica",
    date: "2020-07-23",
    location: {
      city: "Bastia",
      country: "France",
    },
    sport: "Sailing",
    requiredLevel: ["intermediate"],
    duration: "full day",
    maxNbParticipants: 6,
    creator: "Audrey",
    participants: [{ participantID: "Mala" }, { participantID: "Aude" }],
    description:
      "I'll be happy to share my boat with you and sail for a day or tow around the beautiful coast of Corsica.",
  },
  {
    activityName: "Triathlon by night",
    date: "2020-10-10",
    location: {
      city: "Montpellier",
      country: "France",
    },
    sport: "Triathlon",
    requiredLevel: ["experienced"],
    duration: "1/2 day",
    maxNbParticipants: 1,
    creator: "John",
    description:
      "Hey ! I want to go to Montpellier for my first triathlon by night and I am looking for an athlete partner as experienced as I am.",
  },
  {
    activityName: "Walking in Danmark",
    date: "2020-09-09",
    location: {
      city: "Aarhus",
      country: "Danmark",
    },
    sport: "Nordic walking",
    requiredLevel: ["beginner", "intermediate"],
    duration: "4 to 6 days",
    maxNbParticipants: 4,
    creator: "Ella",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec risus nec elit posuere bibendum a vitae tortor. Nullam urna elit, feugiat ac sollicitudin vitae, mattis vel erat. Praesent mollis feugiat molestie. Pellentesque sagittis diam facilisis nulla ultricies pulvinar. Duis lacus lacus, scelerisque non lacinia vitae, sagittis non magna. Mauris elementum ipsum diam, eget congue neque porttitor ut. Pellentesque mollis nunc sem, nec cursus felis elementum in. Suspendisse sagittis sem nec metus efficitur varius. Quisque quis nisl vel augue mollis faucibus. Mauris id libero vitae sapien tempor sollicitudin sit amet at leo. Ut ac dolor ac odio varius laoreet.",
  },
  {
    activityName: "Diving in Egypt",
    date: "2020-09-23",
    location: {
      city: "Cairo",
      country: "Egypt",
    },
    sport: "Swimming / Diving",
    requiredLevel: ["all"],
    duration: "1 week",
    maxNbParticipants: 6,
    creator: "Marc",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut odio lectus. Etiam eu ligula nec eros tempor blandit. Praesent porta mattis vehicula. Nunc imperdiet ligula turpis, sed molestie massa gravida feugiat. Proin rutrum, felis ut tempor malesuada, nulla sem porta mi, sed efficitur augue magna at diam. Phasellus imperdiet auctor nisl ut aliquam. Nullam vitae mi justo. Sed et sagittis nunc. Vivamus et feugiat tortor, eget blandit neque. Duis accumsan tellus non vestibulum porta. Ut dictum augue non egestas vulputate. Mauris id nibh eu leo consectetur lobortis vel id nulla. Fusce orci mi, rutrum id sagittis a, lobortis eget mauris. Cras porta tristique lorem in cursus. Donec sed tempus lacus. Curabitur vel arcu ipsum. Pellentesque fermentum arcu nulla, a tempor diam fermentum ac. Aenean semper nisi non lacus pellentesque, in molestie urna volutpat. Suspendisse eget interdum sem, sed rutrum nunc. Aenean iaculis purus ex. Integer vulputate, arcu vel viverra eleifend, sem tortor bibendum tortor, at euismod lacus nulla finibus arcu. Ut commodo varius rutrum. Ut vitae pharetra quam. Integer sem tellus, aliquam nec consequat sit amet, bibendum ut nunc. Proin vehicula dui in ex imperdiet, sit amet eleifend libero tristique.",
  },
];

module.exports = ActivitiesList;

/* 
ActivityModel.create(ActivitiesList)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.error(dbErr));
 */
