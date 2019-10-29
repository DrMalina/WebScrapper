const puppeteer = require("puppeteer");
const chalk = require("chalk");

class Scrapper {
  constructor(website, url) {
    this.browser = null;
    this.page = null;
    this.results = [];
    this.website = website;
    this.url = url;
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch();
      this.page = await this.browser.newPage();

      await this.page.goto(this.url), { waitUntil: "networkidle0" };
      await this.getResults();
    } catch (err) {
      console.log(chalk`Something wrong with {red initializing} \n${err}`);
    }
  }

  async getResults(query) {
    try {
      let newResults = await this.parseResults(); //results from each page
      this.results = [...this.results, ...newResults];

      const nextPageBtn = await this.page.$(query);

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
        console.log(
          chalk`Fetched results from: {yellow ${this.website.toUpperCase()}}`
        );
        return;
      }
    } catch (err) {
      console.log(chalk`Something wrong with {red getting results} \n${err}`);
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

          const img = await offer.$eval("a.thumb", el => el.children[0].src);

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

          return { title, price, url, location, date, source, type, img};
        });

        const parsedResults = await Promise.all(offersData);
        return parsedResults;
      }
    } catch (err) {
      console.log(chalk`Something wrong with {red parsing results} \n${err}`);
    }
  }

  returnAllResults() {
    return this.results;
  }
}

module.exports = Scrapper;
