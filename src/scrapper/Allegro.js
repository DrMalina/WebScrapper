const Scrapper = require("./Scrapper");

class Allegro extends Scrapper {
  constructor() {
    super("allegro");
  }

  async getResults() {
    await super.getResults("a[rel=next]");
  }
}

module.exports = Allegro;
