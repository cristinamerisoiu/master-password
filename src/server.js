const http = require("http");
const { get } = require("./lib/command");

const server = http.createServer(function(request, response) {
  if (request.url === "/favicon.ico") {
    return response.end();
  }
  if (request.url === "/") {
    return response.end("Welcome to my secrets manager");
  }

  console.log(request.url);
  try {
    const path = request.url.slice(1);
    const secret = get("asd", path);

    response.write(secret);
  } catch (error) {
    response.write("Can not read secret");
  }

  response.end();
});

server.listen(3000);

// // create webserver
// const http = require("http");
// const {readSecrets} =require("./lib/secrets")

// const server = http.createServer(function(request, response) {
//   if  (request.url === {

//   }
//   response.write(secrets.pin);
//   response.write("Hello World");
//   response.end();
// });
// server.listen(3000);

// const secrets =readSecrets();
// console.log(secrets);
