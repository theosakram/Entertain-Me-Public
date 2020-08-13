const route = require("express").Router();
const Controller = require("../controller/movies");

route.get("/", Controller.find);
route.get("/:id", Controller.findById);
route.get("/", Controller.add);
route.get("/:id", Controller.edit);
route.get("/:id", Controller.remove);

module.exports = route;
