const puppeteer = require("puppeteer");
const pageURL = "https://www.olx.pl/oferty/q-banknot-19zł/";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(pageURL);
  let results = [];

  const offersHandler = await page.$$("#offers_table > tbody > tr.wrap");
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
  await browser.close();

  console.log(results);
})();
