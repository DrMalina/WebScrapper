const http = require("http");
const url = require("url");

module.exports = http.createServer(async (req, res) => {
  const service = require("./service.js");
  const reqUrl = url.parse(req.url, true);

  // GET Endpoint
  if (reqUrl.pathname == "/offers" && req.method === "GET") {
    console.log(`Request type: ${req.method} | path: ${reqUrl.pathname}`);
    await service.offersRequest(req, res);
  } else {
    service.invalidRequest(res);
  }
});
