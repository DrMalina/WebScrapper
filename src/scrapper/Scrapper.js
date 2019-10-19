const puppeteer = require("puppeteer");
const URL_ALLEGRO =
  "https://allegro.pl/listing?string=Banknot%2019%20z%C5%82&offerTypeBuyNow=1&bmatch=baseline-nbn-dict42-col-1-1-1002";
const URL_OLX = "https://www.olx.pl/oferty/q-Banknot-19-z%C5%82/";

class Scrapper {
  constructor(website) {
    this.browser = null;
    this.page = null;
    this.results = [];
    this.website = website;

    if (this.website === "allegro") {
      this.url = URL_ALLEGRO;
    } else {
      this.url = URL_OLX;
    }
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({ headless: true });
      this.page = await this.browser.newPage();

      //go to page, wait for loading
      await this.page.goto(this.url), { waitUntil: "networkidle0" };
      await this.getResults();
    } catch (err) {
      console.log(err);
    }
  }

  async getResults(query) {
    try {
      let newResults = await this.parseResults(); //results from each page
      this.results = [...this.results, ...newResults];

      const nextPageBtn = await this.page.$(query); // different query for Allegro and Olx

      //if next btn = next page exists, open it and repeat functions
      if (nextPageBtn) {
        if (this.website === "allegro") {
          const nextPage = await this.page.$eval(query, el => el.dataset.page);
          await this.page.goto(`${this.url}&p=${nextPage}`),
            { waitUntil: "networkidle0" };
        } else if (this.website === "olx") {
          await nextPageBtn.click();
          await this.page.waitForNavigation({ waitUntil: "networkidle0" });
        }
        await this.getResults(); //repeat all the above
      } else {
        //when no more pages to scrap, close and return
        await this.browser.close();
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async parseResults() {
    try {
      if (this.website === "allegro") {
        const offersHandler = await this.page.$$(
          ".opbox-listing--base > ._65c539b > section:last-child > section > article > div > div"
        );

        const offersData = offersHandler.map(async offer => {
          const type = await offer.$eval(
            "div:last-child > div:nth-child(3)",
            el =>
              el.childNodes[0].innerText === "kup teraz"
                ? "purchase"
                : "auction"
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
      } else if (this.website === "olx") {
        const offersHandler = await this.page.$$(
          "#offers_table > tbody > tr.wrap"
        );

        const offersData = offersHandler.map(async offer => {
          const title = await offer.$eval(
            ".title-cell h3 > a > strong",
            el => el.innerText
          );

          const price = await offer.$eval(
            ".price > strong",
            el => el.innerText
          );

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

          const type = "purchase";

          const source = "olx";

          return { title, price, url, location, date, source, type };
        });

        const parsedResults = await Promise.all(offersData);
        return parsedResults;
      }
    } catch (err) {
      console.log(err);
    }
  }

  returnAllResults() {
    return this.results;
  }
}

module.exports = Scrapper;
