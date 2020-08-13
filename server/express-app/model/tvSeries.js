const { db } = require("../config");
const { ObjectId } = require("mongodb");
const tvs = db.collection("tvseries");

class Model {
  static async findAll() {
    try {
      const tvs = await tvs.find().toArray();
      return tvs;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    try {
      const tv = await tvs.findOne({ _id: ObjectId(id) });
      return tv;
    } catch (err) {
      console.log(err);
    }
  }

  static async add(data) {
    try {
      const tv = await tvs.insertOne(data);
      return tv;
    } catch (err) {
      console.log(err);
    }
  }

  static async edit(id, data) {
    try {
      const filter = { _id: ObjectId(id) };
      const result = await tvs.replaceOne(filter, data);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(id) {
    try {
      const result = await tvs.remove({ _id: ObjectId(id) });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Model;
