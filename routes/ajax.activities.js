const express = require("express");
const activityModel = require("../models/Activities");
const router = express.Router();

router.get("/search", (req, res, next) => {
  console.log(req.query);
  let today = new Date();
  activityModel
    .find(req.query)
    // .sort({ date: 1 })
    .populate("sport creator")
    .then((dbResult) => {
      console.log("DB RESULT ========> ", dbResult);
      res.json(dbResult);
    })
    .catch(next);
});

module.exports = router;
