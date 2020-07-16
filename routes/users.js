var express = require("express");
var router = express.Router();
const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
const exposeFlashMessage = require("./../middlewares/exposeFlashMessage");

const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");
const reviewModel = require("../models/Reviews");

// **************************************
// ALL ROUTES ARE PREFIXED WITH /USER
// **************************************

// ACCESS USER ACCOUNT  ===> PROTECT

router.get("/account/:id", protectPrivateRoute, (req, res, next) => {
	userModel
		.findById(req.params.id)
		.populate("sports.sport")
		.then((user) => {
			res.render("user/user-account", {
				title: `${user.firstName}'s account`,
				user,
			});
		})
		.catch(next);
});

// UPDATE USER ACCOUNT  ===> PROTECT

router.get("/edit-account/:id", protectPrivateRoute, (req, res, next) => {
	Promise.all([
		userModel.findById(req.params.id).populate("sports.sport"),
		sportModel.find(),
	])

		.then((dbRes) => {
			res.render("user/update-account", {
				title: `Update ${dbRes[0].firstName}'s account`,
				user: dbRes[0],
				allSports: dbRes[1],
			});
			//console.log(dbRes[0].sports[0].sport.name);
		})
		.catch(next);
});

router.post(
	"/edit-account/:id",
	protectPrivateRoute,
	uploader.single("picture"),
	(req, res, next) => {
		let {
			firstName,
			lastName,
			email,
			password,
			picture,
			birthday,
			stravaLink,
			sport0,
			level0,
			sport1,
			level1,
			sport2,
			level2,
		} = req.body;

		updatedUser = req.body;

		if (req.file) updatedUser.picture = req.file.path;

		sportsArr = [
			{ sport: sport0, level: level0 },
			{ sport: sport1, level: level1 },
			{ sport: sport2, level: level2 },
		];

		const updatedSports = sportsArr.filter((eachSport) => {
			if (eachSport.sport !== undefined && eachSport.level !== undefined)
				return true;
		});

		console.log("FILTERED SPORTS +++++++", updatedSports);

		updatedUser.sports = updatedSports;

		userModel
			.findByIdAndUpdate(req.params.id, updatedUser)
			.then((user) => {
				console.log("UPDATED USER ===>", user);
				res.redirect(`/user/profile/${user.id}`);
			})
			.catch(next);
	}
);

// DELETE USER ACCOUNT

// ask for confirmation
router.get("/confirm-delete/:id", protectPrivateRoute, (req, res, next) => {
	userModel
		.findById(req.params.id)
		.then((user) => {
			res.render("user/user-confirm-delete", { title: "Delete account", user });
		})
		.catch(next);
});

// delete for real
router.post("/delete-account/:id", protectPrivateRoute, (req, res, next) => {
	userModel
		.findByIdAndDelete(req.params.id)
		.then((dbRes) => {
			req.flash("success", "account successfully deleted");
			res.redirect("/auth/signout");
		})
		.catch(next);
});

// USER PROFILE

router.get("/profile/:id", protectPrivateRoute, (req, res, next) => {
	Promise.all([
		userModel.findById(req.params.id).populate("sports.sport"),
		reviewModel.find().populate("reviewedUser reviewerName"),
	])
		.then((dbRes) => {
			let user = dbRes[0];

			let reviews = dbRes[1];

			let userReviews = reviews.filter(
				(review) => review.reviewedUser._id == req.params.id
			);

			res.render("user/user-profile", {
				user,
				userReviews,
			});
		})
		.catch(next);
});

// USER ACTIVITIES

router.get("/activities/:id", protectPrivateRoute, (req, res, next) => {
	Promise.all([
		userModel.findById(req.params.id),
		activityModel
			.find({
				$or: [
					{ "participants.participantID": req.params.id },
					{ "participantsToApprove.participantID": req.params.id },
					{ creator: req.params.id },
				],
			})
			.populate(
				"participants.participantID creator sport participantsToApprove.participantID"
			),
	])
		.then((dbRes) => {
			let user = dbRes[0];
			//console.log("------------User", user);
			let activity = dbRes[1];
			//console.log("------------Activity", activity);
			let toApp = activity.filter(
				(act) => act.participantsToApprove.length > 0
			);
			//console.log("------------Participants to approve", toApp);

			res.render("user/user-activities", {
				title: `${dbRes[0].firstName}'s activities`,
				user,
				activity,
				toApp,
			});
		})
		.catch(next);
});

module.exports = router;
