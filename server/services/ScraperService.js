import mongoose from "mongoose"
import ApiError from "../utils/ApiError"
import puppeteer from "puppeteer"

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
    let urlArr = url.split('.')
    let website = urlArr[2]

      (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)
        await page.screenshot({ path: url })

        if (website == 'amazon') {
          let productImage = await page.evaluate(() => document.querySelector("div img.s-image").textContent)
          console.log(productImage)
        }
        else if (website == 'ebay') {

        }
        else {

        }
      })
  }
}


const _scraperService = new ScraperService()
export default _scraperService