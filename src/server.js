const http = require("http");
const url = require("url");
const fs = require("fs");

const { get, set } = require("./lib/command");

const server = http.createServer(function(request, response) {
  const { pathname } = url.parse(request.url);

  if (pathname === "/favicon.ico") {
    response.writeHead(404);
    return response.end();
  }
  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    const content = fs.readFileSync("src/view/index.html", "utf-8");
    return response.end(content);
  }

  console.log(pathname, request.method);
  try {
    const path = pathname.slice(1);
    if (request.method === "GET") {
      const secret = get("abc", path);
      response.write(secret);
    } else if (request.method === "POST") {
      set("abc", path, Date.now().toString());
      response.write(`Set ${path} value`);
    }
  } catch (error) {
    response.write("Can not read secret");
  }

  response.end();
});

server.listen(3000, () => {
  console.log("Server listens on http://localhost:3000");
});
