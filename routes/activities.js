const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");

// *********************************************
// ALL THESE ROUTES ARE PREFIXED WITH "/activity"
// *********************************************

router.get("/create", (req, res, next) => {
  sportModel
    .find()
    .then((sports) => {
      res.render("activity/create-activity", { title: "New activity", sports });
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Promise.all([
    activityModel
      .findById(req.params.id)
      .populate("participants.participantID creator sport"),
    sportModel.find(),
    userModel.find(),
  ])
    .then((dbRes) => {
      let activity = dbRes[0];
      console.log("----------------- ACTIVITY" + activity.participants);
      res.render("activity/one-activity", {
        title: activity.activityName,
        activity,
      });
    })
    .catch(next);
});

router.get("/update/:id", (req, res, next) => {
  Promise.all([
    activityModel.findById(req.params.id).populate("sport"),
    sportModel.find(),
  ])
    .then((dbRes) => {
      let activity = dbRes[0];
      res.render("activity/update-activity", {
        title: "Update " + activity.activityName,
        activity,
      });
    })
    .catch(next);
});

router.get("/delete/:id", (req, res, next) => {
  activityModel
    .findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/")) //(res.redirect my-activities)
    .catch(next);
});

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

router.post("/update/:id", (req, res, next) => {
  activityModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      req.flash("success", "activity successfully updated");
      res.redirect("/");
    })
    .catch(next);
});

module.exports = router;
