import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import puppeteer from "puppeteer";

class PriceCheckerService {
  async getAll(productArray) {
    for (let i = 0; i < productArray.length; i++) {
      let product = productArray[i];
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(product.productLink);
      try {
        product.currentPrice.$numberDecimal = await page.evaluate(
          () => document.querySelector("table.a-lineitem td span").textContent
        );
      } catch (e) {
        console.log(e);
      }
      await browser.close();
    }
    return productArray;
  }
}

const _priceCheckerService = new PriceCheckerService();
export default _priceCheckerService;
