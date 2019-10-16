const puppeteer = require("puppeteer");
const WEBSITE_URL = "https://www.olx.pl/oferty/q-Banknot-19-z%C5%82/";

const olx = {
  browser: null,
  page: null,
  results: [],

  initialize: async () => {
    olx.browser = await puppeteer.launch({ headless: false });
    olx.page = await olx.browser.newPage();

    //go to page, wait for loading
    await olx.page.goto(WEBSITE_URL), { waitUntil: "networkidle0" };
  },

  getResults: async () => {
    let newResults = await olx.parseResults(); //results from each page
    olx.results = [...olx.results, ...newResults];

    const nextPageBtn = await olx.page.$(
      "span.next > a[data-cy='page-link-next']"
    );

    //if next btn = next page exists, open it and repeat functions
    if (nextPageBtn) {
      try {
        await nextPageBtn.click();
        await olx.page.waitForNavigation({ waitUntil: "networkidle0" });
        await olx.getResults();
      } catch (err) {
        console.log(err);
      }
    } else {
      await olx.browser.close();
      return;
    }
  },

  parseResults: async () => {
    const offersHandler = await olx.page.$$("#offers_table > tbody > tr.wrap");

    const offersData = offersHandler.map(async offer => {
      const title = await offer.$eval(
        ".title-cell h3 > a > strong",
        el => el.innerText
      );

      const price = await offer.$eval(".price > strong", el => el.innerText);

      const url = await offer.$eval(".title-cell .linkWithHash", el => el.href);

      const location = await offer.$eval(
        "i[data-icon=location-filled]",
        el => el.parentNode.innerText
      );

      const time = await offer.$eval(
        "i[data-icon=clock]",
        el => el.parentNode.innerText
      );

      return { title, price, url, location, time };
    });

    const parsedResults = await Promise.all(offersData);

    return parsedResults;
  },

  returnAllResults: () => {
    return olx.results;
  }
};

module.exports = olx;
