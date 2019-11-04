const Scrapper = require("./Scrapper");
const URL =
  "https://allegro.pl/listing?string=Banknot%2019%20z%C5%82&offerTypeBuyNow=1&bmatch=baseline-nbn-dict42-col-1-1-1002";
const nextPageQueryBtn = "a[rel=next]";

class Allegro extends Scrapper {
  constructor() {
    super("allegro", URL);
  }

  async getResults() {
    await super.getResults(nextPageQueryBtn);
  }
}

module.exports = Allegro;
