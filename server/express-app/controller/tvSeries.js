const { db } = require("../config");
const { ObjectId } = require("mongodb");
const tvs = db.collection("tvseries");
const Model = require("../model/tvSeries");

class CommandCenter {
  static async findAll(req, res) {
    try {
      const tvs = await Model.findAll();
      res.status(200).json(tvs);
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(req, res) {
    let { id } = req.params;
    try {
      const tv = await Model.findById(id);
      res.status(200).json(tv);
    } catch (err) {
      console.log(err);
    }
  }

  static async add(req, res) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const tv = await Model.add({
        title,
        overview,
        poster_path,
        popularity,
        tags,
      });
      res.status(201).json(tv.ops[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async edit(req, res) {
    let { id } = req.params;
    let { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const result = await Model.edit(id, {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      });
      res.status(200).json(result.ops[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(req, res) {
    let { id } = req.params;
    try {
      const result = await Model.remove(id);
      res.status(200).json({ msg: "Data deleted successfully" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = CommandCenter;
