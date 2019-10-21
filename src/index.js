const fs = require("fs");
const chalk = require("chalk");
const Olx = require("./scrapper/Olx");
const Allegro = require("./scrapper/Allegro");
const { validate } = require("./helpers");

const allegro = new Allegro();
const olx = new Olx();

(async () => {
  try {
    await olx.initialize();
    await allegro.initialize();
    let results = [...olx.returnAllResults(), ...allegro.returnAllResults()];

    results = validate(results);

    fs.writeFile(
      "offers.json",
      JSON.stringify(results, null, 2),
      "utf-8",
      err => {
        if (err) console.log(err);
        console.log(chalk.green("File has been saved!"));
        console.log("Total results:" + chalk.green(` ${results.length}`));
      }
    );
  } catch (err) {
    console.log(chalk.red(`There was an error: \n ${err}`));
  }
})();
