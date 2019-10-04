// const http = require("http");
// const url = require("url");
// const fs = require("fs");
// const { initDatabase } = require("./lib/mongoDemo");
// const express = require ("express");

// const { get, set, unset } = require("./lib/command");
// const app =express();
// const port =3000;

// app.get("/favicon.ico", (request,respone) => {
//   response.writeHead(404);
//   return response.end();
// })

// const server = http.createServer(async function(request, response) {
//   const { pathname } = url.parse(request.url);
//   console.log(request.url, request.method);
// })

//   if (pathname === "/favicon.ico") {

//   }
//   if (pathname === "/") {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     const content = fs.readFileSync("src/view/index.html", "utf-8");
//     return response.end(content);
//   }

//   try {
//     const path = pathname.slice(1);
//     if (request.method === "GET") {
//       const secret = await get("abc", path);
//       response.end(secret);
//     } else if (request.method === "POST") {
//       let body = "";
//       request.on("data", function(data) {
//         body += data;
//         console.log("Partial body" + body);
//       });
//       request.on("end", async function() {
//         console.log("Body: " + body);
//         await set("abc", path, body);
//         response.end(`Set ${path}`);
//       });
//     } else if (request.method === "DELETE") {
//       await unset("abc", path);
//       response.end(`Delete ${path}`);
//     }
//   } catch (error) {
//     response.end("Can not read secret");
//   }
// });

// initDatabase().then(() => {
//   console.log("Database connected");

//   server.listen(3000, () => {
//     console.log("Server listens on http://localhost:3000");
//   });
// });

const fs = require("fs");
const { initDatabase } = require("./lib/mongoDemo");
const express = require("express");
const { get, set, unset } = require("./lib/command");

const app = express();
const port = 3000;

app.get("/", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  const content = fs.readFileSync("src/view/index.html", "utf-8");
  response.end(content);
});

app.get("/favicon.ico", (request, response) => {
  response.writeHead(404);
  response.end();
});

app.get("/api/:path", async (request, response) => {
  try {
    const secret = await get("abc", request.params.path);
    response.end(secret);
  } catch (error) {
    response.end("Error");
  }
});

app.post("/api/:path", async (request, response) => {
  try {
    let body = "";
    request.on("data", function(data) {
      body += data;
      console.log("Partial body: " + body);
    });
    request.on("end", async function() {
      console.log("Body: " + body);
      await set("abc", request.params.path, body);
      response.end(`Set ${request.params.path}`);
    });
  } catch (error) {
    response.end("Error");
  }
});

app.delete("/api/:path", async (request, response) => {
  await unset("abc", request.params.path);
  response.end(`Delete ${request.params.path}`);
});

initDatabase().then(() => {
  console.log("Database connected");

  app.listen(port, () => {
    console.log(`Server listens on http://localhost:${port}`);
  });
});
