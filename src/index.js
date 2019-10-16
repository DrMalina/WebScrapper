const olx = require("./olx");

(async () => {
  await olx.initialize();
  let results = await olx.parseResults();
})();
