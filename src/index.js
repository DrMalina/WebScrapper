const fs = require("fs");
const OLX = require("./Olx");
const { validate } = require("./helpers");

const FILE_NAME = "offers.json";
const olx = new OLX();

(async () => {
  try {
    await olx.initialize();
    let results = olx.returnAllResults();

    results = validate(results);

    fs.writeFile(FILE_NAME, JSON.stringify(results, null, 2), "utf-8", err => {
      if (err) console.log(err);
      console.log("File has been saved!");
    });
  } catch (err) {
    console.log(`Something wrong... ${err}`);
  }
})();
