const route = require("express").Router();
const movies = require("./movies");
const series = require("./series");
const Controller = require("../controller");

// route.use("/movies", movies);
// route.use("/series", series);
route.get("/", Controller.get);

module.exports = route;
