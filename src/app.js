const { readSecrets, writeSecrets } = require("./models/secrets");
const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;
/*
comands:
set {key} {value}
unset {key}
get {key}
*/

// function showProcessDetails() {
//   console.log(`Node version: ${process.version}`);
//   console.log(`Platform: ${process.platform} ${process.arch}`);
//   console.log(`Arguments: ${process.argv.join(" ")}`);
// }

// function add(a, b) {
//   return a + b;
// }
// function sub(a, b) {
//   return a - b;
// }

// const addResult = add(firstArgument, secondArgument);
// console.log(`Add Result ${addResult}`);
// const subResult = sub(firstArgument, secondArgument);
// console.log(`Sub Result ${subResult}`);

// showProcessDetails();

//alternative solution with slice and array destructuring
// const [action, key, value] = process.argv.slice(2);

// Aray deconstructer
// const userArgv = process.argv.slice(2);
// const action= userArgv[0];
// const key = userArgv[1];
// const value = userArgv[2];

// console.log(action, key, value);

//create 3 functions based on action (set,unset, get). It is enough to call the correct function and log the required parameters.

function set(key, value) {
  console.log("set", key, value);
  const newSecrets = {
    [key]: value
  };
  writeSecrets(newSecrets);
}

function unset(key) {
  console.log("unset", key);
}

function get(key) {
  const secrets = readSecrets();
  console.log("get", key);
  const secret = secrets[key];
  console.log(secret);
}

// call the correct function based on action
// set (key,value);
// unset (key);
// get(key);

// solution 1:
// switch (action) {
//   case "get":
//     get(key);
//     break;
//   case "set":
//     set(key, value);
//     break;
//   case "unset":
//     unset(key);
//     break;
//   default:
//     throw new Error("unknown action");
// }

// // solution 2:
// function perform() {
//   if (action === "set") {
//     set(key, value);
//   } else if (action === "unset") {
//     unset(key);
//   } else if (action === "get") {
//     get(key);
//   } else {
//     throw new Error("unknown action");
//   }
// }
// perform();

// solution 3:
const commands = {
  set,
  get,
  unset
};

const command = commands[action];
if (!command) {
  throw new Error("unknown action");
}
command(key, value);
