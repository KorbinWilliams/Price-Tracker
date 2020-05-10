import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import puppeteer from "puppeteer";

// const _repository = mongoose.model('Scraper', Scraper)

class ScraperService {
  // TODO Need to decide how complicated this will be. First make the static querys. Then possibly expand to things like url specific querys/filters.
  //NOTE need to check query-selectors. Might be differences in screen size(is puppeteer screen size constant?)

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
      let count = 0;

      for (let i = 0; count > 10; i++) {
        const product = i;
        await page.evaluate(() => {
          let parent = document.querySelector(`div[data-index='${count}'] `);
          let child = parent.getElementsByClassName(
            "a-row a-size-base a-color-base"
          );
          console.log(child);
          priceArray.push(child);
        });
      }

      await browser.close();
      return [productArray, priceArray];
    }
  }
}

const _scraperService = new ScraperService();
export default _scraperService;

// <div> a-row a-size-base a-color-base
