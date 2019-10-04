const crypto = require("crypto");
const { getCollection } = require("./mongoDemo");

async function set(password, key, value) {
  const secretsCollection = await getCollection("secrets");

  // Update or Insert secret

  const cryptoKey = crypto.createCipher("aes-128-cbc", password);
  let encryptedValue = cryptoKey.update(value, "utf8", "hex");
  encryptedValue += cryptoKey.final("hex");

  await secretsCollection.insertOne({ key, value: encryptedValue });
}

async function unset(password, key) {
  const secretsCollection = await getCollection("secrets");
  //Delete secrets

  if (!get(password, key)) {
    throw new Error("No access to secrets!");
  }
  await secretsCollection.deleteOne({ key });
}

async function get(password, key) {
  const secretsCollection = await getCollection("secrets");
  const secret = await secretsCollection.findOne({ key });

  const cryptoKey = crypto.createDecipher("aes-128-cbc", password);
  let decryptedSecret = cryptoKey.update(secret, "hex", "utf8");
  decryptedSecret += cryptoKey.final("utf8");

  return decryptedSecret;
}

const commands = {
  set,
  get,
  unset
};

exports.executeCommand = function executeCommand(password, action, key, value) {
  const command = commands[action];
  if (!command) {
    throw new Error("unknown action");
  }
  return command(password, key, value);
};

exports.set = set;
exports.unset = unset;
exports.get = get;
