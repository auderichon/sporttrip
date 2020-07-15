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
      .find({ date: { $gte: today } }) // { sort : { date: 1}}) //+ classer par date
      .populate({ path: "creator", model: userModel })
      .populate("sport"),
    userModel.find(),
    sportModel.find(),
  ])
    .then((dbRes) => {
      let activities = dbRes[0];
      res.render("index", {
        title: "SporTrip: find partners for your next sports trip",
        activities,
      });
    })
    .catch(next);
});

module.exports = router;
