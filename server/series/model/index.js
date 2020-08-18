const { db } = require("../config");
const { ObjectId } = require("mongodb");
const tvs = db.collection("tvseries");

class Model {
  static async findAll() {
    try {
      const series = await tvs.find().toArray();
      return series;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    try {
      const serial = await tvs.findOne({ _id: ObjectId(id) });
      return serial;
    } catch (err) {
      console.log(err);
    }
  }

  static async add(data) {
    try {
      const serial = await tvs.insertOne(data);
      return serial;
    } catch (err) {
      console.log(err);
    }
  }

  static async edit(id, data) {
    try {
      const filter = { _id: ObjectId(id) };
      const result = await tvs.updateOne(filter, { $set: data });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(id) {
    try {
      const result = await tvs.deleteOne({ _id: ObjectId(id) });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Model;
