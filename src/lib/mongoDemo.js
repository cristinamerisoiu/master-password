const { MongoClient } = require("mongodb");

let db = null;
async function initDatabase() {
  // Connection URL
  const url =
    "mongodb+srv://admin:neuefische@masterpassword-c3tl2.mongodb.net/admin?retryWrites=true&w=majority";
  // Database Name
  const dbName = "master-password";

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Use connect method to connect to the Server
  await client.connect();

  db = client.db(dbName);
}

async function getCollection(collectionName) {
  if (!db) {
    await initDatabase();
  }
  return db.collection(collectionName);
}

exports.initDatabase = initDatabase;
exports.getCollection = getCollection;
