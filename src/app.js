const readline = require("readline");
const crypto = require("crypto");
const fs = require("fs");

const { executeCommand } = require("./lib/command");

const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const masterPasswordHash = fs.readFileSync(".password", "utf-8");

rl.question("What is the master password? ", password => {
  rl.output.write("\n");
  if (verifyHash(password, masterPasswordHash)) {
    const result = executeCommand(password, action, key, value);
    if (result) {
      console.log(result);
    }
  } else {
    console.log("Invalid master password!");
  }
  rl.close();
});

// Override default output to hide password
rl._writeToOutput = function _writeToOutput() {
  rl.output.write("*");
};

// Checking the password hash
function verifyHash(password, original) {
  const originalHash = original.split("$")[1];
  const salt = original.split("$")[0];
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");

  return hash === originalHash;
}
// // call the correct function based on action
// // set (key,value);
// // unset (key);
// // get(key);

// // solution 1:
// // switch (action) {
// //   case "get":
// //     get(key);
// //     break;
// //   case "set":
// //     set(key, value);
// //     break;
// //   case "unset":
// //     unset(key);
// //     break;
// //   default:
// //     throw new Error("unknown action");
// // }

// // // solution 2:
// // function perform() {
// //   if (action === "set") {
// //     set(key, value);
// //   } else if (action === "unset") {
// //     unset(key);
// //   } else if (action === "get") {
// //     get(key);
// //   } else {
// //     throw new Error("unknown action");
// //   }
// // }
// // perform();

// // solution 3:
// const commands = {
//   set,
//   get,
//   unset
// };

// const command = commands[action];
// if (!command) {
//   throw new Error("unknown action");
// }
// command(key, value);

// const rl= readLine.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const masterPassword = "abc";

// rl.question(`What is your master password?`, password => {
//   rl.output.write("/n");
//   if (password === masterPassword) {
//     console.log("Correct")
//     executeCommand(action);
//   }else {
//     console.log("Invalid password");
//   }
//   rl.close();
// });

// //Override default output to hide password
// rl.writeToOutput = function _writeToOutput(){
//   rl.output.write("*");
// };
