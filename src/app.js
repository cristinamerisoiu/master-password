const readline = require("readline");
const { executeCommand } = require("./lib/command");

const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const masterPassword = "abc";
rl.question("What is the master password? ", password => {
  rl.output.write("\n");
  if (password === masterPassword) {
    executeCommand(action, key, value);
  } else {
    console.log("Invalid master password!");
  }
  rl.close();
});

// Override default output to hide password
rl._writeToOutput = function _writeToOutput() {
  rl.output.write("*");
};

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
