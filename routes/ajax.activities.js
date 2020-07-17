const express = require("express");
const activityModel = require("../models/Activities");
const router = express.Router();

router.get("/search", (req, res, next) => {
  let today = new Date();
  req.query.date = { $gte: today };
  activityModel
    .find(req.query)
    .sort({ date: 1 })
    .populate("sport creator")
    .then((dbResult) => {
      console.log("DB RESULT ========> ", dbResult);
      res.json(dbResult);
    })
    .catch(next);
});

module.exports = router;
