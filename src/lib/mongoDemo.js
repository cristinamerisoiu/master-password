const { MongoClient } = require("mongodb");

async function initDatabase() {
  // Connection URL
  const url = "mongodb://localhost:27017/master-password";
  // Database Name
  const dbName = "master-password";

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Use connect method to connect to the Server
  await client.connect();

  const db = client.db(dbName);
  const secretsCollection = await db.createCollection("secrets");
  console.log("Collection secrets created");

  client.close();
}

exports.initDatabase = initDatabase;
