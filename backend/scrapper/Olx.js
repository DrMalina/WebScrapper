const Scrapper = require("./Scrapper");
const URL = "https://www.olx.pl/oferty/q-Banknot-19-z%C5%82/";
const nextPageBtnQuery = "span.next > a[data-cy='page-link-next']";

class Olx extends Scrapper {
  constructor() {
    super("olx", URL);
  }

  async getResults() {
    await super.getResults(nextPageBtnQuery);
  }
}

module.exports = Olx;
