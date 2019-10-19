const puppeteer = require("puppeteer");
const WEBSITE_URL =
  "https://allegro.pl/listing?string=Banknot%2019%20z%C5%82&offerTypeBuyNow=1&bmatch=baseline-nbn-dict42-col-1-1-1002";

class Allegro {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = [];
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({ headless: false });
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

      const nextPageBtn = await this.page.$("a[rel=next]");

      //if next btn = next page exists, open it and repeat functions
      if (nextPageBtn) {
        //POSSIBLE BUG: page.click() doesnt work on this site because the parameters of search are lost
        //it is required to set url manually that is why dataset page is used
        const nextPage = await this.page.$eval(
          "a[rel=next]",
          el => el.dataset.page
        );
        await this.page.goto(`${WEBSITE_URL}&p=${nextPage}`),
          { waitUntil: "networkidle0" };
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
        ".opbox-listing--base > ._65c539b > section:last-child > section > article > div > div"
      );

      const offersData = offersHandler.map(async offer => {
        const type = await offer.$eval(
          "div:last-child > div:nth-child(3)",
          el =>
            el.childNodes[0].innerText === "kup teraz" ? "purchase" : "auction"
        );

        const title = await offer.$eval(
          "div:last-child > div:first-child > h2",
          el => el.innerText
        );

        const price = await offer.$eval(
          "div:last-child > div:nth-child(2) > div > div > span",
          el => el.innerText
        );

        const url = await offer.$eval(
          "div:first-child > div:first-child a",
          el => el.href
        );

        const source = "allegro";

        return { title, price, url, source, type };
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

module.exports = Allegro;
