const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
// const userModel = require("../models/Users");

// *********************************************
// ALL THESE ROUTES ARE PREFIXED WITH "/activity"
// *********************************************

// router.get("/:id", (req, res, next) => {
//   activityModel
//     .findById(req.params.id)
//     .then((activity) => {
//       res.render("activity/one-activity", { activity });
//     })
//     .catch(next);
// });

router.get("/create", (req, res, next) => {
  sportModel
    .find()
    .then((sports) => {
      res.render("activity/create-activity", { title: "New activity", sports });
    })
    .catch(next);
});

// router.get("/update/:id", (req, res, next) => {
//   activityModel
//     .findById(req.params.id)
//     .then((activity) => {
//       res.render("activity/update-activity", { activity });
//     })
//     .catch(next);
// });

router.post("/create", (req, res, next) => {
  const {
    activityName,
    date,
    city,
    country,
    sport,
    requiredLevel,
    duration,
    maxNbParticipants,
    description,
  } = req.body;

  activityModel
    .create({
      activityName,
      date,
      city,
      country,
      sport,
      requiredLevel,
      duration,
      maxNbParticipants,
      description,
      creator: req.session.currentUser._id,
    })
    .then(() => {
      req.flash("success", "activity successfully created");
      res.redirect("/");
    })
    .catch(next);
});

module.exports = router;
