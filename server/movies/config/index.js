const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "entertain-me";
const client = new MongoClient(url, { useUnifiedTopology: true });

const connecting = async () => {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log("Connected successfully to server");
};

connecting().catch(console.log);
const db = client.db(dbName);

module.exports = { connecting, db };
