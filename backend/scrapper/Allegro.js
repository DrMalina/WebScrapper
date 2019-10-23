const Scrapper = require("./Scrapper");
const URL =
  "https://allegro.pl/listing?string=Banknot%2019%20z%C5%82&offerTypeBuyNow=1&bmatch=baseline-nbn-dict42-col-1-1-1002";

class Allegro extends Scrapper {
  constructor() {
    super("allegro", URL);
  }

  async getResults() {
    await super.getResults("a[rel=next]");
  }
}

module.exports = Allegro;
