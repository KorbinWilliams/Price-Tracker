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
      product.currentPrice = await page.evaluate(
        () => document.querySelector("table.a-lineitem td span").textContent
      );
    }
  }
}

const _priceCheckerService = new PriceCheckerService();
export default _priceCheckerService;
