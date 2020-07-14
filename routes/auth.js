const express = require("express");
const router = express.Router();
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt"); // npm i bcrypt
const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");
const reviewModel = require("../models/Reviews");

// **************************************
// ALL ROUTES ARE PREFIXED WITH /AUTH
// **************************************

// SIGN UP create user account  ===> à protéger
router.get("/signup", (req, res, next) => {
	sportModel
		.find()
		.then((sports) => {
			res.render(
				"user/create-account",
				{ title: "Create account", sports }
			);
		})
		.catch(next);
});

router.post("/signup", uploader.single("picture"), (req, res, next) => {
	const newUser = req.body;
	if (req.file) newUser.picture = req.file.path;

	if (!newUser.email || !newUser.password) {
		req.flash("error", "no empty fields here please");
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

				userModel.create(newUser).then(() => res.redirect("/auth/signin"));
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
		req.flash("error", "wrong credentials");
		return res.redirect("/auth/signin");
	}

	userModel
		.findOne({ email: user.email })
		.then((dbRes) => {
			if (!dbRes) {
				// no user found with this email
				req.flash("error", "wrong credentials");
				return res.redirect("/auth/signin");
			}
			// user has been found in DB !
			if (bcrypt.compareSync(user.password, dbRes.password)) {
				// encryption says : password match success
				const { _doc: clone } = { ...dbRes }; // make a clone of db user

				delete clone.password; // remove password from clone

				req.session.currentUser = clone; // user is now in session... until session.destroy
				console.log(clone.id);
				return res.redirect("/");
			} else {
				// encrypted password match failed
				req.flash("error", "wrong credentials");
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
