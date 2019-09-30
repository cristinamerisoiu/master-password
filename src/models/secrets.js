const fs = require("fs");

const filename = "secret.json";
function readSecrets() {
  try {
    const secretsJSON = fs.readFileSync(filename, "utf-8");
    const secrets = JSON.parse(secretsJSON);
    return secrets;
  } catch (error) {
    writeSecrets({});
    return {};
  }
}

function writeSecrets(secrets) {
  fs.writeFileSync(filename, JSON.stringify(secrets));
}

exports.readSecrets = readSecrets;
exports.writeSecrets = writeSecrets;
