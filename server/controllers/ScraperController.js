import _scraperService from '../services/ScraperService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'


//PUBLIC
export default class ScraperController {
  constructor() {
    this.router = express.Router()
      //NOTE .use(Authorize.authenticated) indicates what needs authorization to use depending on where it's placed.
      // .use(Authorize.authenticated)
      .get('', this.getAll)
      // .get('/:id', this.getById)
      // .post('', this.create)
      // .put('/:id', this.edit)
      // .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }


  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      let data = await _scraperService.getAll(req.body.url)
      console.log(data)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

}


