const puppeteer = require("puppeteer");
const WEBSITE_URL = "https://www.olx.pl/oferty/q-Banknot-19-z%C5%82/";

class OLX {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = [];
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({ headless: true });
      this.page = await this.browser.newPage();

      //go to page, wait for loading
      await this.page.goto(WEBSITE_URL), { waitUntil: "networkidle0" };
      await this.getResults();
    } catch (err) {
      console.log(err);
    }
  }

  async getResults() {
    try {
      let newResults = await this.parseResults(); //results from each page
      this.results = [...this.results, ...newResults];

      const nextPageBtn = await this.page.$(
        "span.next > a[data-cy='page-link-next']"
      );

      //if next btn = next page exists, open it and repeat functions
      if (nextPageBtn) {
        await nextPageBtn.click();
        await this.page.waitForNavigation({ waitUntil: "networkidle0" });
        await this.getResults();
      } else {
        await this.browser.close();
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async parseResults() {
    try {
      const offersHandler = await this.page.$$(
        "#offers_table > tbody > tr.wrap"
      );

      const offersData = offersHandler.map(async offer => {
        const title = await offer.$eval(
          ".title-cell h3 > a > strong",
          el => el.innerText
        );

        const price = await offer.$eval(".price > strong", el => el.innerText);

        const url = await offer.$eval(
          ".title-cell .linkWithHash",
          el => el.href
        );

        const location = await offer.$eval(
          "i[data-icon=location-filled]",
          el => el.parentNode.innerText
        );

        const date = await offer.$eval(
          "i[data-icon=clock]",
          el => el.parentNode.innerText
        );

        return { title, price, url, location, date };
      });

      const parsedResults = await Promise.all(offersData);

      return parsedResults;
    } catch (err) {
      console.log(err);
    }
  }

  returnAllResults() {
    return this.results;
  }
}

module.exports = OLX;
