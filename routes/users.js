var express = require("express");
var router = express.Router();
const uploader = require("./../config/cloudinary");

const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");
const reviewModel = require("../models/Reviews");

// *********************************************
// TODO: PREFIXED THE ROUTES WITH /user
// *********************************************

// CREATE USER ACCOUNT  ===> à protéger

router.get("/signup", (req, res, next) => {
   sportModel
      .find()
      .then((sports) => {
         res.render("user/create-account", {sports});
      })
      .catch(next);
});

router.post("/signup", uploader.single("picture"), (req, res, next) => {
   const newUser = req.body;
   if (req.file) newUser.picture = req.file.path;

   userModel
      .create(newUser)
      .then(() => {
         req.flash("success", "account successfully created");
         res.redirect("/");
         // TODO: once user has subscribed => consider isLogged = true ;
      })
      .catch(next);
});

// USER ACCOUNT  ===> à protéger

router.get("/account/:id", (req, res, next) => {
   userModel
      .findById(req.params.id)
      .populate("sport", "activity", "reviews")
      .then((user) => {
         res.render("user/user-account", user);
      })
      .catch(next);
});

// UPDATE USER ACCOUNT  ===> PROTECT

router.post("/profile/:id", uploader.single("picture"), (req, res, next) => {
   const updatedUser = req.body;
   if (req.file) updatedUser.picture = req.file.path;

   userModel
      .findByIdAndUpdate(updatedUser)
      .populate("sport", "activity", "reviews")
      .then((user) => {
         res.render("user/user-profile", user);
         res.redirect("/profile/:id");
      })
      .catch(next);
});

// USER PROFILE

router.get("/profile/:id", (req, res, next) => {
   userModel
      .findById(req.params.id)
      .populate("sport", "activity", "reviews")
      .then((user) => {
         res.render("user/user-profile", user);
      })
      .catch(next);
});

// UPDATE USER PROFILE ===> PROTECT

router.post("/profile/:id", uploader.single("picture"), (req, res, next) => {
   const updatedUser = req.body;
   if (req.file) updatedUser.picture = req.file.path;

   userModel
      .findByIdAndUpdate(req.params.id, updatedUser)
      .populate("sport", "activity", "reviews")
      .then((user) => {
         res.render("user/user-profile", user);
         res.redirect("/profile/:id");
      })
      .catch(next);
});

// USER ACTIVITIES ===> PROTECT

router.get("/activities/:id", (req, res, next) => {
   userModel
      .findById(req.params.id)
      .populate("sport", "activity", "reviews")
      .then((user) => {
         res.render("user/user-activities", user);
      })
      .catch(next);
});



module.exports = router;
