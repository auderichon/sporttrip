const express = require("express");
const router = express.Router();
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt"); // npm i bcrypt

const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
const exposeFlashMessage = require("./../middlewares/exposeFlashMessage");

const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");
const reviewModel = require("../models/Reviews");

// **************************************
// ALL ROUTES ARE PREFIXED WITH /AUTH
// **************************************

// SIGN UP
router.get("/signup", (req, res, next) => {
	sportModel
		.find()
		.then((sports) => {
			res.render("user/create-account", { title: "Create account", sports });
		})
		.catch(next);
});

router.post("/signup", uploader.single("picture"), (req, res, next) => {
	console.log("REQ BODY ??", req.body);
	let {
		firstName,
		lastName,
		email,
		password,
		picture,
		birthday,
		stravaLink,
		sport1,
		level1,
		sport2,
		level2,
		sport3,
		level3,
	} = req.body;

	newUser = req.body;

	if (req.file) newUser.picture = req.file.path;

	function check_date_of_birth(value) {
		var dateOfBirth = value;
		var arr_dateText1 = dateOfBirth.split("T");
		var arr_dateText = arr_dateText1[0].split("-");
		year = arr_dateText[0];
		month = arr_dateText[1];
		day = arr_dateText[2];

		var mydate = new Date();
		mydate.setFullYear(year, month - 1, day);

		var maxDate = new Date();
		maxDate.setYear(maxDate.getFullYear() - 18);

		if (maxDate < mydate) {
			return false;
		}
		return true;
	}

	if (!check_date_of_birth(birthday)) {
		req.flash("error", "Sorry, you have to be at least 18 to register !");
		return res.redirect("/auth/signup");
	}

	if (!newUser.email || !newUser.password) {
		req.flash("error", "Fill in mandatory fields please");
		return res.redirect("/auth/signup");
	} else {
		userModel
			.findOne({ email: newUser.email })
			.then((dbRes) => {
				if (dbRes) {
					// if dbRes exists => user or email already exists
					req.flash("error", "sorry, email is already taken :/");
					return res.redirect("/auth/signup");
				}
				const salt = bcrypt.genSaltSync(10);
				const hashed = bcrypt.hashSync(newUser.password, salt);
				// generates a unique random hashed password
				newUser.password = hashed; // new user is ready for db
				console.log(sport1);
				newUser.sports = [
					{ sport: sport1, level: level1 },
					{ sport: sport2, level: level2 },
					{ sport: sport3, level: level3 },
				];

				userModel.create(newUser).then((dbRes2) => {
					console.log("USER IN DATABASE ========== ", dbRes2);
					req.flash("success", "Account created.");

					res.redirect("/auth/signin");
				});
			})
			.catch(next);
	}
});

// LOG IN
router.get("/signin", (req, res) => {
	res.render("signin", { title: "Log In" });
});

router.post("/signin", (req, res, next) => {
	const user = req.body;

	if (!user.email || !user.password) {
		// one or more field is missing
		req.flash("error", "wrong credentials !");
		return res.redirect("/auth/signin");
	}

	userModel
		.findOne({ email: user.email })
		.then((dbRes) => {
			if (!dbRes) {
				// no user found with this email
				req.flash("error", "wrong credentials !");
				return res.redirect("/auth/signin");
			}
			// user has been found in DB !
			if (bcrypt.compareSync(user.password, dbRes.password)) {
				// encryption says : password match success
				const { _doc: clone } = { ...dbRes }; // make a clone of db user
				delete clone.password; // remove password from clone
				req.session.currentUser = clone; // user is now in session... until session.destroy
				// req.flash("success", "logged in !");

				return res.redirect("/");
			} else {
				// encrypted password match failed
				req.flash("error", "wrong credentials !");
				return res.redirect("/auth/signin");
			}
		})
		.catch(next);
});

// LOG OUT

router.get("/signout", (req, res) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
});

module.exports = router;
