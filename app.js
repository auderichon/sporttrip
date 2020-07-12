require("dotenv").config();
require("./config/dbconfig");
require("./helpers/hbs");

// base dependencies
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const createError = require("http-errors");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const MongoStore = require("connect-mongo")(session);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// config logger (for debug)
app.use(logger("dev"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// MIDDLEWARES

// routers

module.exports = app;
