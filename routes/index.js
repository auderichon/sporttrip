var express = require("express");
var router = express.Router();
const activityModel = require("../models/Activities");

/* GET home page. */
router.get("/", (req, res, next) => {
  let today = new Date();
  activityModel
    .find({
      day: { $gte: today },
    })
    .then((activities) => res.render("index", { activities }))
    .catch(next);
});

module.exports = router;
