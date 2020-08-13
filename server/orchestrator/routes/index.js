const route = require("express").Router();
const movies = require("./movies");
const series = require("./series");

route.use("/movies", movies);
route.use("/series", series);

module.exports = route;
