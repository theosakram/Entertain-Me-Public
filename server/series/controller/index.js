const Model = require("../model");

class CommandCenter {
  static async findAll(req, res) {
    try {
      const series = await Model.findAll();
      res.status(200).json(series);
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(req, res) {
    let { id } = req.params;
    try {
      const serial = await Model.findById(id);
      res.status(200).json(serial);
    } catch (err) {
      console.log(err);
    }
  }

  static async add(req, res) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const serial = await Model.add({
        title,
        overview,
        poster_path,
        popularity,
        tags,
      });
      res.status(201).json(serial.ops[0]);
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
