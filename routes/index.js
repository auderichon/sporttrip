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
      .find //{
      //   date: { $gte: today }, + classer par date
      // }
      ()
      .populate("sport")
      .populate("users"),
    sportModel.find(),
    userModel.find(),
  ])
    .then((dbRes) => {
      let activities = dbRes[0];
      let sports = dbRes[1];
      let users = dbRes[2];

      res.render("index", {
        title: "SportTrip: find partners for your next sports trip",
        activities,
        sports,
        users,
      });
    })
    .catch(next);
});

module.exports = router;
