const puppeteer = require("puppeteer");
const WEBSITE_URL = "https://www.olx.pl/oferty/q-banknot-19zł/";

const olx = {
  browser: null,
  page: null,

  initialize: async () => {
    olx.browser = await puppeteer.launch({ headless: false });
    olx.page = await olx.browser.newPage();

    //go to page, wait for loading
    await olx.page.goto(WEBSITE_URL);
  },

  parseResults: async () => {
    let results = [];

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

      results.push({ title, price, url, location, time });
    });

    await Promise.all(offersData);
    olx.browser.close();

    console.log(results);
  }
};

module.exports = olx;
