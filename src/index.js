const olx = require("./olx");

(async () => {
  await olx.initialize();
  await olx.getResults();
  let results = olx.returnAllResults();
})();
