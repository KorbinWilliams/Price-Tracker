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

    // "urlArr[1] is not a function"

    (async () => {
      let urlArr = url.split('.')
      let website = urlArr[1]
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(url)
      let picture = await page.screenshot({ path: 'test.png' })

      if (website == 'amazon') {
        let productImageStr = await page.evaluate(() => document.querySelector("div img.s-image"))
        let response = productImageStr
        return response
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