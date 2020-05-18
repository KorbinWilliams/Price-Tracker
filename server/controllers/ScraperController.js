import _scraperService from "../services/ScraperService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class ScraperController {
  constructor() {
    this.router = express
      .Router()
      // .use(Authorize.authenticated)
      .get("/:url", this.getAll)
      // .get('/:id', this.getById)
      // .post('', this.create)
      // .put('/:id', this.edit)
      // .delete('/:id', this.delete)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getAll(req, res, next) {
    try {
      let data = await _scraperService.getAll(req.params.url);
      console.log(data);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }
}
