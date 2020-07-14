var express = require("express");
var router = express.Router();
const uploader = require("./../config/cloudinary");

const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");
const reviewModel = require("../models/Reviews");

// **************************************
// ALL ROUTES ARE PREFIXED WITH /USER
// **************************************

// ACCESS USER ACCOUNT  ===> PROTECT

router.get("/account/:id", (req, res, next) => {
	userModel
		.findById(req.params.id)
		.populate("sports.sport")
		.then((user) => {
			res.render("user/user-account", { user });
		})
		.catch(next);
});

// UPDATE USER ACCOUNT  ===> PROTECT

router.get("/edit-account/:id", (req, res, next) => {
	userModel
		.findById(req.params.id)
		.populate("sports.sport")
		.then((user) => {
			res.render("user/update-account", { user });
		})
		.catch(next);
});

router.post(
	"/edit-account/:id",
	uploader.single("picture"),
	(req, res, next) => {
		const updatedUser = req.body;
		if (req.file) updatedUser.picture = req.file.path;

		userModel
			.findByIdAndUpdate(req.params.id, updatedUser)
			.populate("sports.sport")
			.then((user) => {
				res.redirect(`/user/profile/${updatedUser.id}`);
			})
			.catch(next);
	}
);

// DELETE USER ACCOUNT

// ask for confirmation
router.get(
	"/confirm-delete/:id", (req, res, next) => {
		userModel
			.findById(req.params.id)
			.then((user) => {
			res.render("user/user-confirm-delete", { user });
			})
			.catch(next);
	}
);

// delete for real
router.post("/delete-account/:id", (req, res, next) => {
	userModel
		.findByIdAndDelete(req.params.id)
		.then((dbRes) => {
			req.flash("success", "account successfully deleted");
			res.redirect("/auth/signout");
		})
		.catch(next);
});

// USER PROFILE

router.get("/profile/:id", (req, res, next) => {
	Promise.all([
		userModel.findById(req.params.id).populate("sports.sport"),
		reviewModel.find().populate("reviewedUser"),//.populate("reviewerName"),
		activityModel
			.find()
			.populate("participants.participantID")
			//.populate("creator"),
	])
		.then((dbRes) => {
			console.log(dbRes[0]);
			res.render("user/user-profile", {
				user: dbRes[0],
				review: dbRes[1],
				activity: dbRes[2],
			});
		})
		.catch(next);
});

// USER ACTIVITIES ===> PROTECT

router.get("/activities/:id", (req, res, next) => {
	Promise.all([
		activityModel.find().populate("participants.participantID"),
		userModel.findById(req.params.id),
	])
		.then((dbRes) => {
			res.render("user/user-activities", {
				activity: dbRes[0],
				user: dbRes[1],
			});
		})
		.catch(next);
});

module.exports = router;
