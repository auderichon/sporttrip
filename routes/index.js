var express = require("express");
var router = express.Router();
const activityModel = require("../models/Activities");

/* GET home page. */
router.get("/", (req, res, next) => {
  let today = new Date();
  activityModel
    .find //{
    //   date: { $gte: today }, + classer par date
    // }
    ()
    .then((activities) => {
      console.log(activities);
      res.render("index", {
        title: "SportTrip: find partners for your next sports trip",
        activities,
      });
    })
    .catch(next);
});

module.exports = router;
