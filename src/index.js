const fs = require("fs");
const OLX = require("./Olx");

const FILE_NAME = "offers.json";

(async () => {
  const olx = new OLX();
  await olx.initialize();
  await olx.getResults();
  let results = olx.returnAllResults();

  fs.writeFile(FILE_NAME, JSON.stringify(results, null, 2), "utf-8", err => {
    if (err) console.log(err);
    console.log("File has been saved!");
  });
})();
