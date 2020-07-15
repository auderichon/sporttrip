require("dotenv").config();
require("./config/dbconfig"); // db setup
require("./helpers/hbs");

// base dependencies
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const devMode = false;
const logger = require("morgan");
// const io = require('socket.io')(app);

// config logger (for debug)
app.use(logger("dev"));

// initial config
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// SESSION SETUP HEAD
const sessionObj = session({
	secret: process.env.SESSION_SECRET,
	cookie: { maxAge: 3600000 }, // in millisec
	store: new MongoStore({
		mongooseConnection: mongoose.connection, // we store session infos in mongodb
		ttl: 24 * 60 * 60, // 1 day
	}),
	saveUninitialized: true,
	resave: true,
});
app.use(sessionObj);
app.use(flash());

// MIDDLEWARES
if (devMode === true) {
  app.use(require("./middlewares/devMode")); // triggers dev mode during dev phase
  app.use(require("./middlewares/debugSessionInfos")); // displays session debug
}

app.use(function (req, res, next) {
  req.session.toto = "yolo";
  next();
});

app.use(require("./middlewares/exposeLoginStatus"));
//app.use(require("./middlewares/exposeFlashMessage"));

// routers
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/activity", require("./routes/activities"));
app.use("/user", require("./routes/users"));

module.exports = { app, sessionObj };
