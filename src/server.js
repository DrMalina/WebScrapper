const chalk = require("chalk");

const hostname = "127.0.0.1";
const port = 3000;

const server = require("./controller");

server.listen(port, hostname, () => {
  console.log(chalk`Server is running at {blue http://${hostname}:${port}/}`);
});
