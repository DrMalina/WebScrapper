const Scrapper = require("./Scrapper");

class Olx extends Scrapper {
  constructor() {
    super("olx");
  }

  async getResults() {
    await super.getResults("span.next > a[data-cy='page-link-next']");
  }
}

module.exports = Olx;
