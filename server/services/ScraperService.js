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
  async getProductArray(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    try {
      let productArray = await page.evaluate(() =>
        Array.from(document.querySelectorAll("div.s-include-content-margin"))
          .map((product) => ({
            title: product.querySelector("h2 span").textContent,
            image: product.querySelector("img").src,
            //NOTE need to take off price evaluate separately
            price: product.querySelector("div.a-size-base").innerHTML || 0,
          }))
          .slice(0, 10)
      );
      return productArray;
    } catch (error) {
      this.getProductArray(url);
    }
  }
  // NOTE Takes the price which is a string of html and extracts the price if possible
  replacePrice(productArray) {
    for (let i = 0; i < productArray.length; i++) {
      const product = productArray[i];
      if (product.price != 0) {
        if (product.price.indexOf("a-offscreen") != -1) {
          let priceIndex = product.price.indexOf("a-offscreen");
          let cutout = product.price.substring(
            priceIndex,
            product.price.length
          );
          product.price = cutout.substring(13, cutout.indexOf("<"));
        }
      }
    }
    return productArray;
  }

  async getAll(url) {
    //NOTE Takes in url returns product array
    let urlArr = url.split(".");
    let website = urlArr[1];

    if (website == "amazon") {
      //NOTE returns the first 10 products of an amazon search
      let productArray = await this.getProductArray(url);
      productArray = this.replacePrice(productArray);
      // await browser.close();
      return productArray;
    }
  }
}

const _scraperService = new ScraperService();
export default _scraperService;

// <div> a-row a-size-base a-color-base
