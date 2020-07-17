const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");
const reviewModel = require("../models/Reviews");

const protectPrivateRoute = require("../middlewares/protectPrivateRoute");

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

router.get("/all", (req, res, next) => {
  activityModel
    .find()
    .sort({ date: -1 })
    .populate("creator")
    .populate("sport")

    .then((activities) => {
      res.render("activity/all-activities", {
        title: "All existing activities",
        activities,
      });
    })
    .catch(next);
});

router.get("/:id", protectPrivateRoute, (req, res, next) => {
  Promise.all([
    activityModel
      .findById(req.params.id)
      .populate("participants.participantID creator sport"),
  ])
    .then((dbRes) => {
      let activity = dbRes[0];
      let today = new Date();
      let partiFull = activity.participants.length;
      partiFull === activity.maxNbParticipants
        ? (partiFull = true)
        : (partiFull = false);

      res.render("activity/one-activity", {
        title: activity.activityName,
        activity,
        today,
        partiFull,
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

router.get("/register/:activityid/:userid", (req, res, next) => {
  let user = req.params.userid;
  activityModel
    .findByIdAndUpdate(req.params.activityid, {
      $push: { participantsToApprove: { participantID: user } },
    })
    .then(() => res.redirect(`/user/activities/${user}`))
    .catch(next);
});

router.get("/validate/:id/:actid", (req, res, next) => {
  let user = req.params.id;
  console.log("=========this is the user", user);
  activityModel
    .findByIdAndUpdate(req.params.actid, {
      $push: {
        participants: { participantID: user },
      },
    })
    .then(() =>
      activityModel
        .findByIdAndUpdate(req.params.actid, {
          $pull: { participantsToApprove: { participantID: user } },
        })
        .then(() =>
          res.redirect(`/user/activities/${req.session.currentUser._id}`)
        )
        .catch(next)
    )
    .catch(next);
});

router.get("/decline/:id/:actid", (req, res, next) => {
  let user = req.params.id;
  console.log("=========this is the user", user);
  activityModel
    .findByIdAndUpdate(req.params.actid, {
      $pull: { participantsToApprove: { participantID: user } },
    })
    .then(() => res.redirect(`/user/activities/${req.session.currentUser._id}`))
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
      res.redirect(`/user/activities/${req.session.currentUser._id}`);
    })
    .catch(next);
});

router.post("/update/:id", (req, res, next) => {
  activityModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      req.flash("success", "activity successfully updated");
      res.redirect(`/user/activities/${req.session.currentUser._id}`);
    })
    .catch(next);
});

// SEND REVIEWS ON USER/ACTIVITY

router.post(
  "/:activityID/reviews-for-:id",
  protectPrivateRoute,
  (req, res, next) => {
    const { reviewContent, rate } = req.body;

    reviewModel
      .create({
        reviewedUser: req.params.id,
        reviewerName: req.session.currentUser._id,
        reviewContent,
        rate,
        date: Date.now,
      })
      .then((newReview) => {
        req.flash("success", "review added");
        console.log("NEW REVIEW SENT ====>", newReview);
        res.redirect(`/activity/${req.params.activityID}`);
      })
      .catch(next);
  }
);

module.exports = router;
