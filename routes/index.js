var express = require("express");
var router = express.Router();
const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");

/* GET home page. */
router.get("/", (req, res, next) => {
  let today = new Date();

  Promise.all([
    activityModel
      .find({ date: { $gte: today } })
      .sort({ date: 1 })
      .populate({ path: "creator", model: userModel })
      .populate("sport"),
    userModel.find(),
    sportModel.find(),
  ])
    .then((dbRes) => {
      let activities = dbRes[0];

      let arrC = [];
      for (let i = 0; i < activities.length; i++) {
        arrC.push(activities[i].location.country);
      }
      let countries = [...new Set(arrC)];
      countries = countries.filter((country) => country !== undefined);

      let arrS = [];
      for (let i = 0; i < activities.length; i++) {
        arrS.push(activities[i].sport);
      }
      let sports = [...new Set(arrS)];

      // let arrD = [];
      // for (let i = 0; i < activities.length; i++) {
      //   arrD.push(activities[i].duration);
      // }
      // let durations = [...new Set(arrD)];

      res.render("index", {
        title: "SporTrip: find partners for your next sports trip",
        activities,
        sports,
        countries,
        js: "filter",
        // durations,
      });
    })
    .catch(next);
});

module.exports = router;
