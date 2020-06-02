import _priceCheckerService from "../services/PriceCheckerService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class PriceCheckerController {
  constructor() {
    this.router = express.Router().post("", this.getAll).use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getAll(req, res, next) {
    try {
      let data = await _priceCheckerService.getAll(req.body);
      console.log(data);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }
}
