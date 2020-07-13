var express = require("express");
var router = express.Router();
const activityModel = require("../models/Activities");

/* GET home page. */
router.get("/", (req, res, next) => {
  let today = new Date();
  activityModel
    .find({
      date: { $gte: today },
    })
    .then((activities) => {
      console.log(activities);
      res.render("index", { title: "SportTrip", activities });
    })
    .catch(next);
});

module.exports = router;
