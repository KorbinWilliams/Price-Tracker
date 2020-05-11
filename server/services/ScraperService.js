import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import puppeteer from "puppeteer";

// const _repository = mongoose.model('Scraper', Scraper)

class ScraperService {
  // TODO Need to decide how complicated this will be. First make the static querys. Then possibly expand to things like url specific querys/filters.
  //NOTE need to check query-selectors. Might be differences in screen size(is puppeteer screen size constant?) const puppeteer = require('puppeteer');
  // const iPhone = puppeteer.devices['iPhone 6'];
  // (async () => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.emulate(iPhone);
  //   await page.goto('https://www.google.com');
  //   // other actions...
  //   await browser.close();
  // })();

  async getAll(url) {
    //NOTE Takes in url opens puppeteer(chromium), then goes to url
    let urlArr = url.split(".");
    let website = urlArr[1];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    if (website == "amazon") {
      //NOTE returns the first 10 products of an amazon search
      let productArray = await page.evaluate(() =>
        Array.from(document.querySelectorAll("div.s-include-content-margin"))
          .map((product) => ({
            title: product.querySelector("h2 span").textContent,
            image: product.querySelector("img").src,
            //NOTE need to take off price evaluate separately
            price: "",
          }))
          .slice(0, 10)
      );

      let priceArray = [];

      for (let i = 0; i <= productArray.length; i++) {
        let product = productArray[i];
        let child = await page.evaluate((i) => {
          document.querySelector(`div[data-index='${i}']`);
        }, i);
        // product.price = child;
        priceArray.push(child);
      }

      let test1 = await page.evaluate((i) => {
        document.querySelector(`div[data-index='${i}']`).innerHTML;
      });
      // let test = test1.toString()

      await browser.close();
      return [productArray, test1];
    }
  }
}

const _scraperService = new ScraperService();
export default _scraperService;

// <div> a-row a-size-base a-color-base
