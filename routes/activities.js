const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");

// *********************************************
// ALL THESE ROUTES ARE PREFIXED WITH "/activity"
// *********************************************

router.get("/:id", (req, res, next) => {
  activityModel
    .findById(req.params.id)
    .then((activity) => {
      res.render("activity/one-activity", { activity });
    })
    .catch(next);
});

router.get("/create", (req, res, next) => {
  res.render("activity/create-activity");
});

router.get("/update/:id", (req, res, next) => {
  activityModel
    .findById(req.params.id)
    .then((activity) => {
      res.render("activity/update-activity", { activity });
    })
    .catch(next);
});

module.exports = router;
