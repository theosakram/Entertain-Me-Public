const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "entertain-me";
const client = new MongoClient(url, { useUnifiedTopology: true });

async function connecting() {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log("Connected successfully to server");
  } catch (err) {
    console.log(err);
    await client.close();
  }
}

connecting();
const db = client.db(dbName);

module.exports = { connecting, db };
