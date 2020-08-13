const route = require("express").Router();
const Controller = require("../controller/movies");

route.get("/", Controller.find);
route.get("/:id", Controller.findById);
route.post("/", Controller.add);
route.put("/:id", Controller.edit);
route.delete("/:id", Controller.remove);

module.exports = route;
