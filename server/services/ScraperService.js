import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import puppeteer from "puppeteer";

// const _repository = mongoose.model('Scraper', Scraper)

class ScraperService {
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

  // NOTE Takes in a url ,goes to page, creates an array from the results.
  async getProductArray(url) {
    const browser = await puppeteer
      .launch
      // { headless: false }
      ();
    const page = await browser.newPage();
    await page.goto(url);
    try {
      let productArray = await page.evaluate(() =>
        Array.from(document.querySelectorAll("div.s-include-content-margin"))
          .map((product) => {
            if (product.querySelector(".a-price-whole")) {
              return {
                title: product.querySelector("h2 span").textContent,
                image: product.querySelector("img").src,
                price: product.querySelector("div.a-size-base").innerHTML,
                productLink: product.querySelector("h2").innerHTML,
              };
            } else
              return {
                title: product.querySelector("h2 span").textContent,
                image: product.querySelector("img").src,
                price: 0,
                productLink: product.querySelector("h2").innerHTML,
              };
          })
          .slice(0, 10)
      );

      await browser.close();
      return productArray;
    } catch (error) {
      console.log(error);
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

  // NOTE takes the html from productLink cuts out the link html makes a substring for the link
  replaceProductLink(productArray) {
    for (let i = 0; i < productArray.length; i++) {
      let product = productArray[i];
      let beggining = product.productLink.indexOf("<");
      let end = product.productLink.indexOf(">");
      let linkHtml = product.productLink.substring(beggining, end);
      let linkHtmlEnd = linkHtml.length - 2;
      product.productLink = linkHtml.substring(48, linkHtmlEnd);
      product.productLink = "https://www.amazon.com/" + product.productLink;
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
      if (productArray == undefined) {
        productArray = await this.getProductArray(url);
        productArray = this.replacePrice(productArray);
        productArray = this.replaceProductLink(productArray);
        return productArray;
      } else {
        productArray = this.replacePrice(productArray);
        productArray = this.replaceProductLink(productArray);
        return productArray;
      }
    }
  }
}

const _scraperService = new ScraperService();
export default _scraperService;

// <div> a-row a-size-base a-color-base
