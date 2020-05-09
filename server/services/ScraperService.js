import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import puppeteer from "puppeteer";

// const _repository = mongoose.model('Scraper', Scraper)

class ScraperService {
  // TODO Need to decide how complicated this will be. First make the static querys. Then possibly expand to things like url specific querys/filters.
  //NOTE need to check query-selectors. Might be differences in screen size(is puppeteer screen size constant?)
  checkProductArray(propToEval, queryStr, parentQuery) {
    // count = 0
    // document.find(parent => parentDataIndex = count)
    let propVal = parentQuery.querySelector(queryStr);
    if (propVal.textContent != null) {
      propToEval = propVal.textContent;
    }
  }

  async getAll(url) {
    let urlArr = url.split(".");
    let website = urlArr[1];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    if (website == "amazon") {
      //NOTE returns the first 10 products of an amazon search
      let productArray = page.evaluate(() =>
        Array.from(document.querySelectorAll("div.s-include-content-margin"))
          .map((product) => ({
            title: product.querySelector("h2 span").textContent,
            image: product.querySelector("img").src,
            //NOTE need to take off price evaluate separately
            price: "",
          }))
          .slice(0, 10)
      );
      // this.checkProductArray(document.querySelectorAll("div.s-include-content-margin"), )

      let productCheck = page.evaluate(
        () => document.querySelector("div[data-index='0'] h2 span").innerHTML
      );

      return productCheck;
      // return productArray;
    }
  }
}

const _scraperService = new ScraperService();
export default _scraperService;
