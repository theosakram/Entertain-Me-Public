const { db } = require("../config");
const { ObjectId } = require("mongodb");
const movs = db.collection("movies");

class Model {
  static async findAll() {
    try {
      const movies = await movs.find().toArray();
      return movies;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    try {
      const movie = await movs.findOne({ _id: ObjectId(id) });
      return movie;
    } catch (err) {
      console.log(err);
    }
  }

  static async add(data) {
    try {
      const movie = await movs.insertOne(data);
      return movie;
    } catch (err) {
      console.log(err);
    }
  }

  static async edit(id, data) {
    try {
      const filter = { _id: ObjectId(id) };
      const result = await movs.replaceOne(filter, data);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(id) {
    try {
      const result = await movs.deleteOne({ _id: ObjectId(id) });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Model;
