const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/getName") {
    res.end("Sourabh");
  }
  res.end("Hello world");
});
server.listen(3000);
