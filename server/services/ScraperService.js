import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import puppeteer from "puppeteer";

// const _repository = mongoose.model('Scraper', Scraper)

class ScraperService {
  // TODO Need to decide how complicated this will be. First make the static querys. Then possibly expand to things like url specific querys/filters.
  //NOTE need to check query-selectors. Might be differences in screen size(is puppeteer screen size constant?)
  //TODO AMAZON SPECIFIC for-loop over array of data-indexes. create an object for each title/img/price
  //NOTE AMAZON TOP LEVEL PARENT =<div data-index="${num}">
  // Title: <span class="a-size-medium a-color-base a-text-normal" dir="auto">
  //Image: PARENT = <div class="a-section aok-relative s-image-fixed-height"> CHILD = <img class="s-image">
  // Price: CHILD = <span class="a-price-whole">
  async getAll(url) {
    let urlArr = url.split(".");
    let website = urlArr[1];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // input[name='login']
    if (website == "amazon") {
      //NOTE returns the first 10 titles of an amazon search
      // let productTitles = await page.evaluate(() =>
      //   Array.from(document.querySelectorAll("h2 span"))
      //     .map((partner) => partner.textContent)
      //     .slice(0, 10)
      // );
      // let productImages = await page.evaluate(() =>
      //   Array.from(document.querySelectorAll("img"))
      //     .map((partner) => partner.src)
      //     .slice(0, 10)
      // );
      let productPrices = page.evaluate(() =>
        Array.from(document.querySelectorAll("span.a-price-whole"))
          .map((partner) => partner.textContent)
          .slice(0, 10)
      );

      let productArray = page.evaluate(() =>
        Array.from(document.querySelectorAll("div.s-include-content-margin"))
          .map((compact) => ({
            title: compact.querySelector("h2 span").textContent,
            image: compact.querySelector("img").src,
            price: compact.querySelector("span.a-price-whole").textContent,
          }))
          .slice(0, 10)
      );
      return productArray;
      // else if (website == 'ebay') {

      // }
      // else {

      // }
    }
  }
}

const _scraperService = new ScraperService();
export default _scraperService;
